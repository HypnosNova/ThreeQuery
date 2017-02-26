var loader=new THREE.TextureLoader()
var textureFlare0 = loader.load( "images/lensflare/lensflare0.png" );
var textureFlare1 = loader.load( "images/lensflare/lensflare1.png" );
var textureFlare2 = loader.load( "images/lensflare/lensflare2.png" );
var textureFlare3 = loader.load( "images/lensflare/lensflare3.png", undefined, setLoadMessage("Calibrating optics") );

//	just used in galactic core
function addLensFlare(x,y,z, size, overrideImage){
	var flareColor = new THREE.Color( 0xffffff );
	// flareColor.copy( 0xffffff );
	flareColor.offsetHSL( 0.08, 0.5, 0.5 );

	lensFlare = new THREE.LensFlare( overrideImage ? overrideImage : textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );

	lensFlare.add( textureFlare1, 4096, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );

	// lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
	// lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
	// lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	// lensFlare.add( textureFlare3, 70, 1.0, THREE.AdditiveBlending );

	lensFlare.customUpdateCallback = lensFlareUpdateCallback;
	lensFlare.position = new THREE.Vector3(x,y,z);
	lensFlare.size = size ? size : 16000 ;
	return lensFlare;
}

//	used for every star in star model view
function addStarLensFlare(x,y,z, size, overrideImage, hueShift){
	var flareColor = new THREE.Color( 0xffffff );

	// flareColor.copy( 0xffffff );

	hueShift = 1.0 - hueShift;
	hueShift = constrain( hueShift, 0.0, 1.0 );

	var lookupColor = gradientCanvas.getColor( hueShift );
	flareColor.setRGB( lookupColor[0]/255, lookupColor[1]/255, lookupColor[2]/255 );

	var brightnessCalibration = 1.25 - Math.sqrt( Math.pow(lookupColor[0],2) + Math.pow(lookupColor[1],2) + Math.pow(lookupColor[2],2) )/255 * 1.25;	

	flareColor.offsetHSL(/*0.25*/0.0, -0.15, brightnessCalibration );

	//flareColor.g *= 0.85;

	lensFlare = new THREE.LensFlare( overrideImage ? overrideImage : textureFlare0, 700, 0.0, THREE.AdditiveBlending, flareColor );
	lensFlare.customUpdateCallback = lensFlareUpdateCallback;
	lensFlare.position = new THREE.Vector3(x,y,z);
	lensFlare.size = size ? size : 16000 ;

	lensFlare.add( textureFlare1, 512, 0.0, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 40, 0.6, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 80, 0.7, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
	lensFlare.add( textureFlare3, 60, 1.0, THREE.AdditiveBlending );	

	// for( var i in lensFlarelensFlares ){
	// 	var flare = lensFlare.lensFlares[i];		
	// }
	return lensFlare;
}

function lensFlareUpdateCallback( object ) {
    var f, fl = this.lensFlares.length;
    var flare;
    var vecX = -this.positionScreen.x * 2;
    var vecY = -this.positionScreen.y * 2;
    var size = object.size ? object.size : 16000;

    var camDistance = camera.position.length();

	var heatVisionValue = pSystem ? pSystem.shaderMaterial.uniforms.heatVision.value : 0.0;

    for( f = 0; f < fl; f ++ ) {

        flare = this.lensFlares[ f ];

        flare.x = this.positionScreen.x + vecX * flare.distance;
        flare.y = this.positionScreen.y + vecY * flare.distance;

        // flare.wantedRotation = flare.x * Math.PI * 0.25;
        // flare.rotation += ( flare.wantedRotation - flare.rotation ) * 0.25;

        flare.scale = size / camDistance;
        flare.rotation = 0;
        flare.opacity = 1.0 - heatVisionValue;
    }

	// object.lensFlares[ 2 ].y += 0.025;
	// object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5;
}
