uniform samplerCube tCube;
uniform float tFlip;
varying vec3 vViewPosition;
uniform float opacity;

void main() {
	vec3 wPos = cameraPosition - vViewPosition;
	vec4 textureColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );
	textureColor.xyz *= opacity;
	gl_FragColor = textureColor;
}