const canvasWrap = document.querySelector<HTMLDivElement>("#canvas-wrap");
const canvas = document.querySelector<HTMLCanvasElement>("#canvas-webgl");
const gl = canvas!.getContext('webgl2');

const resizeCanvas = () => {
  const width = canvasWrap!.clientWidth;
  canvas!.width = width;
  canvas!.height = (width / 3) * 2;
};

const updateClearColor = () => {
  if (!gl) return
  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, 0, 0);
}

const update = () => {
  updateClearColor();
  requestAnimationFrame(update);
}

const init = () => {
  resizeCanvas();
  update();

  window.addEventListener("resize", resizeCanvas);
};

init();

export {};
