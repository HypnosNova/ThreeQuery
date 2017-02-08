attribute float size;
attribute vec3 customColor;

varying vec3 vColor;
varying float dist;
varying float pSize;

uniform float zoomSize;
uniform float scale;

void main() {

	vColor = customColor;

	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

	dist = length( mvPosition.xyz );

	float finalSize = scale * size / length( mvPosition.xyz );

	//gl_PointSize = clamp( scaledSize , 0., 4000.);
	//gl_PointSize = size * ( scale / length( mvPosition.xyz ));

	gl_PointSize = finalSize;

	gl_Position = projectionMatrix * mvPosition;
	pSize = finalSize;

}