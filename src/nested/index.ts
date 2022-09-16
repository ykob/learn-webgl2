const canvasWrap = document.querySelector<HTMLDivElement>("#canvas-wrap");
const canvas = document.querySelector<HTMLCanvasElement>("#canvas-webgl");

const resizeCanvas = () => {
  const width = canvasWrap!.clientWidth;
  canvas!.width = width;
  canvas!.height = (width / 3) * 2;
};

const init = () => {
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};

init();

export {};
