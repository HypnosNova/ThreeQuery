uniform vec3 color;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform float idealDepth;
uniform float blurPower;
uniform float blurDivisor;
uniform float sceneSize;
uniform float cameraDistance;
uniform float heatVision;

varying vec3 vColor;
varying float dist;
varying float pSize;

void main() {	
	vec4 particleColor = vec4(color*vColor, 1.0);
	float bwColor = length(particleColor) * 0.15 * heatVision;
	particleColor.xyz *= (1.0-heatVision);
	particleColor.xyz += bwColor;

	float depth = gl_FragCoord.z / gl_FragCoord.w;
	depth = (depth / (sceneSize + cameraDistance) );

	float focus = clamp( depth - pSize, 0., 1. );

	vec4 color0 = texture2D(texture0, vec2(gl_PointCoord.x, gl_PointCoord.y) );
	vec4 color1 = texture2D(texture1, gl_PointCoord );

	vec4 diffuse = mix( color0, color1, clamp(depth,0.,1.) );	

	gl_FragColor = particleColor * diffuse;


}