uniform float zoomSize;
uniform float scale;

attribute float size;
attribute vec3 customColor;
attribute float colorIndex;

varying vec3 vColor;
varying float dist;
varying float pSize;

varying float zoom;

varying float starColorLookup;

void main() {

	vColor = customColor;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	dist = length( mvPosition.xyz );

	//float distColorFade = clamp(100. / dist,0.,1.);

	gl_PointSize = scale * size  * zoomSize / dist;

	gl_Position = projectionMatrix * mvPosition;

	pSize = gl_PointSize;
	zoom = zoomSize;
	starColorLookup = colorIndex;

}