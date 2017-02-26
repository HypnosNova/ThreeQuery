uniform vec3 color;
uniform sampler2D texture0;
varying vec3 vColor;
varying float pitchNormalized;
void main() {
	float angleColor = 1.-pitchNormalized;
	vec4 diffuse = texture2D(texture0, vec2(gl_PointCoord.x, gl_PointCoord.y) );
	vec3 finalColor = clamp( diffuse.xyz * angleColor * 0.95, 0., 1. );
	gl_FragColor = vec4(finalColor, 1.0);
}