varying vec2 vUv;

uniform sampler2D texturePrimary;

uniform float spectralLookup;
uniform sampler2D textureSpectral;

void main() {
	vec2 uv = vUv;
	
	vec4 foundColor = texture2D( texturePrimary, uv );
	foundColor.x *= 1.4;
	foundColor.y *= 1.2;
	foundColor.z *= 0.7;
	//foundColor.xyz *= 10.0;
	foundColor = clamp( foundColor, 0., 1. );	

	float spectralLookupClamped = clamp( spectralLookup, 0., 1. );
	vec2 spectralLookupUV = vec2( 0., spectralLookupClamped );
	vec4 spectralColor = texture2D( textureSpectral, spectralLookupUV );	

	spectralColor.x = pow( spectralColor.x, 2. );
	spectralColor.y = pow( spectralColor.y, 2. );
	spectralColor.z = pow( spectralColor.z, 2. );

	spectralColor.xyz += 0.2;

	vec3 finalColor = clamp( foundColor.xyz * spectralColor.xyz * 1.4 , 0., 1.);

	gl_FragColor = vec4( finalColor, 1.0 );

}