varying vec2 vUv;
uniform sampler2D texturePrimary;
uniform sampler2D textureColor;
uniform float time;

uniform float spectralLookup;
uniform sampler2D textureSpectral;

void main() {
	vec3 colorIndex = texture2D( texturePrimary, vUv ).xyz;
	float lookupColor = colorIndex.x;
	lookupColor = fract( lookupColor + time * 0.04 );
	lookupColor = clamp(lookupColor,0.2,0.98);
	vec2 lookupUV = vec2( lookupColor, 0. );
	vec3 foundColor = texture2D( textureColor, lookupUV ).xyz;

	foundColor.xyz += 0.4;
	foundColor *= 10.0;

	float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
	vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
	vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	

	spectralColor.x = pow( spectralColor.x, 3. );
	spectralColor.y = pow( spectralColor.y, 3. );
	spectralColor.z = pow( spectralColor.z, 3. );

	gl_FragColor = vec4( foundColor * colorIndex * spectralColor.xyz , 1.0 );
}