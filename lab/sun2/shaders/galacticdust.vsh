uniform float scale;
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;
uniform float cameraPitch;
varying float pitchNormalized;
void main() {
	vColor = customColor;
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	float dist = length( mvPosition.xyz );

	gl_PointSize = size * scale / dist;

	gl_Position = projectionMatrix * mvPosition;
	
	pitchNormalized = abs(pow(cameraPitch * .8,2.));
}