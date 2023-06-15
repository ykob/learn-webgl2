import { mat4 } from "gl-matrix";
import vs from "./glsl/square.vs";
import fs from "./glsl/square.fs";

const canvasWrap = document.querySelector<HTMLDivElement>("#canvas-wrap");
const canvas = document.querySelector<HTMLCanvasElement>("#canvas-webgl");
const gl = canvas!.getContext("webgl2");
const program = gl!.createProgram();

const cameraMatrix = mat4.create();
const modelViewMatrix = mat4.create();
const projectionMatrix = mat4.create();

// VAO
const vao = gl?.createVertexArray();

// variables of Square
const squareVertexBuffer = gl!.createBuffer();
const squareIndicesBuffer = gl!.createBuffer();
const squareVertexShader = gl!.createShader(gl!.VERTEX_SHADER);
const squareFragmentShader = gl!.createShader(gl!.FRAGMENT_SHADER);
const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];
const indices = [0, 1, 2, 0, 2, 3];
const verticesArray = new Float32Array(vertices);
const indicesArray = new Uint16Array(indices);
let aVertexPosition: number | null = null;

const resizeCanvas = () => {
  const width = canvasWrap!.clientWidth;
  canvas!.width = width;
  canvas!.height = (width / 3) * 2;
};

const initProgram = () => {
  if (!gl || !program || !squareVertexShader || !squareFragmentShader) return;

  // Prepare for Vertex Shader
  gl.shaderSource(squareVertexShader, vs);
  gl.compileShader(squareVertexShader);
  gl.attachShader(program, squareVertexShader);

  // Prepare for Fragment Shader
  gl.shaderSource(squareFragmentShader, fs);
  gl.compileShader(squareFragmentShader);
  gl.attachShader(program, squareFragmentShader);

  gl.linkProgram(program);
  gl.useProgram(program);

  // Get attribute index number
  aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
};

const initBuffers = () => {
  if (
    !gl ||
    !vao ||
    !squareVertexBuffer ||
    !squareIndicesBuffer ||
    aVertexPosition === null
  )
    return;

  gl.bindVertexArray(vao);

  // Prepare for VBO
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesArray, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(aVertexPosition);
  gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);

  // Prepare for IBO
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndicesBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesArray, gl.STATIC_DRAW);

  // Clear
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

const update = () => {
  if (!gl || !vao) return;

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndicesBuffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  // Clear
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  requestAnimationFrame(update);
};

const init = () => {
  if (!gl) return;
  gl.clearColor(0, 0, 0, 1);
  resizeCanvas();
  initProgram();
  initBuffers();
  update();

  window.addEventListener("resize", resizeCanvas);
};

init();

export {};
