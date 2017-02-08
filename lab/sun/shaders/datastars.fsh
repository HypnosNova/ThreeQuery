uniform vec3 color;
uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D spectralLookup;
uniform sampler2D heatVisionTexture;
uniform float idealDepth;
uniform float blurPower;
uniform float blurDivisor;
uniform float sceneSize;
uniform float cameraDistance;
uniform float brightnessScale;
uniform float heatVision;

varying vec3 vColor;
varying float dist;
varying float zoom;
varying float starColorLookup;


void main() {

	gl_FragColor = vec4( color * vColor, 1. );

	float depth = gl_FragCoord.z / gl_FragCoord.w;
	depth = 1. - (depth / sceneSize );

	float focus = clamp( depth, 0., 1. );

	vec4 color0 = texture2D(texture0, gl_PointCoord );
	vec4 color1 = texture2D(texture1, gl_PointCoord );

	float clampedLookup = clamp( starColorLookup, 0., 1.0 );
	vec2 spectralUV = vec2( 0., clampedLookup );	
	vec4 starSpectralColor = texture2D( spectralLookup, spectralUV );

	//float distFade = clamp( zoom, 0., 1.);

	vec4 diffuse = mix( color1, color0, focus );

	starSpectralColor.x = pow(starSpectralColor.x,2.);
	starSpectralColor.y = pow(starSpectralColor.y,2.);
	starSpectralColor.z = pow(starSpectralColor.z,2.);
	diffuse.xyz *= starSpectralColor.xyz;
	//diffuse.xyz = starSpectralColor.xyz;

	vec3 blueTarget = (vec3(1.0) - vec3( 0.5, 0.6, .65)) * cameraDistance;
	diffuse.xyz -= blueTarget * (1.0-heatVision);

	vec4 heatVisionTextureColor = texture2D( heatVisionTexture, gl_PointCoord );	

	vec4 heatVisionMixColor = mix( diffuse, starSpectralColor, heatVision );

	if( heatVision > 0.0 && heatVisionTextureColor.w < 0.5 ){
		discard;
	}
	
	gl_FragColor = heatVisionMixColor;
	
}