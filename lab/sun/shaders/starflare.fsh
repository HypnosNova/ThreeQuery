varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D texturePrimary;
varying vec4 screenPosition;

uniform float spectralLookup;
uniform sampler2D textureSpectral;

void main() {
	vec2 uv = vUv;
	// uv.y *= 2.;
	uv.y -= 0.5;
	uv.y = abs(uv.y);
	// uv.x = 0.2 + uv.x * 0.4;
	// uv.x = fract(uv.x * 2.);
	vec3 colorIndex = texture2D( texturePrimary, uv ).xyz;

	float intensity = 1.45 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ) * 2.0;
	vec3 outerGlow = vec3( 1., 1., 1. ) * pow( intensity, 2.0 );

	float distanceToCenter = clamp(length( screenPosition.xyz ) - 0.45 ,0., 1.0);

	float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
	vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
	vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	

	spectralColor.x = pow( spectralColor.x, 3. );
	spectralColor.y = pow( spectralColor.y, 3. );
	spectralColor.z = pow( spectralColor.z, 3. );

	spectralColor.xyz *= 10.0;

	// gl_FragColor = vec4( distanceToCenter, 0., 0., 1.0 );
	gl_FragColor = vec4( (colorIndex - pow(intensity,2.) * 0.1) * pow(distanceToCenter,3.) * spectralColor.xyz, 1.0 );

}