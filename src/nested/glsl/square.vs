#version 300 es
precision mediump float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

in vec3 aVertexPosition;

void main(void) {
  vec4 mvPosition = ModelViewMatrix * vec4(aVertexPosition, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
