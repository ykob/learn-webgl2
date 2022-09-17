import vs from "./glsl/square.vs";
import fs from "./glsl/square.fs";

const canvasWrap = document.querySelector<HTMLDivElement>("#canvas-wrap");
const canvas = document.querySelector<HTMLCanvasElement>("#canvas-webgl");
const gl = canvas!.getContext("webgl2");
const program = gl!.createProgram();

// variables of Square
const squareVertexBuffer = gl!.createBuffer();
const squareIndicesBuffer = gl!.createBuffer();
const squareVertexShader = gl!.createShader(gl!.VERTEX_SHADER);
const squareFragmentShader = gl!.createShader(gl!.FRAGMENT_SHADER);
const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];
const indices = [0, 1, 2, 0, 2, 3];
const verticesArray = new Float32Array(vertices);
const indicesArray = new Uint16Array(indices);
let aVertexPosition: number | null = null

const resizeCanvas = () => {
  const width = canvasWrap!.clientWidth;
  canvas!.width = width;
  canvas!.height = (width / 3) * 2;
};

const initProgram = () => {
  if (!gl || !program || !squareVertexShader || !squareFragmentShader) return;
  gl.shaderSource(squareVertexShader, vs);
  gl.compileShader(squareVertexShader);
  gl.shaderSource(squareFragmentShader, fs);
  gl.compileShader(squareFragmentShader);
  gl.attachShader(program, squareVertexShader);
  gl.attachShader(program, squareFragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
};

const initBuffers = () => {
  if (!gl || !squareVertexBuffer || !squareIndicesBuffer) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesArray, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndicesBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesArray, gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

const update = () => {
  if (!gl) return;
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
  if (aVertexPosition !== null) {
    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aVertexPosition);
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndicesBuffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
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
