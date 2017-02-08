var loader=new THREE.TextureLoader();
var galacticTexture0 = loader.load( "images/galactic_sharp.png" );
var galacticTexture1 = loader.load( "images/galactic_blur.png" );

var galacticUniforms = {
	color:     { type: "c", value: new THREE.Color( 0xffffff ) },
	texture0:   { type: "t", value: galacticTexture0 },
	texture1:   { type: "t", value: galacticTexture1 },
	idealDepth: { type: "f", value: 1.0 },
	blurPower: { type: "f", value: 1.0 },
	blurDivisor: { type: "f", value: 2.0 },
	sceneSize: { type: "f", value: 120.0 },
	cameraDistance: { type: "f", value: 800.0 },
	zoomSize: 	{ type: "f", value: 1.0 },
	scale: 		{ type: "f", value: 1.0 },
	heatVision: { type: "f", value: 0.0 },
};

var galacticAttributes = {
	size: 			{ type: 'f', value: [] },
	customColor: 	{ type: 'c', value: [] }
};


function generateGalaxy(){
	setLoadMessage("Generating the galaxy");
	var galacticShaderMaterial = new THREE.ShaderMaterial( {
		uniforms: 		galacticUniforms,
//		attributes:     galacticAttributes,
		vertexShader:   shaderList.galacticstars.vertex,
		fragmentShader: shaderList.galacticstars.fragment,

		blending: 		THREE.AdditiveBlending,
		depthTest: 		false,
		depthWrite: 	false,
		transparent:	true,
		sizeAttenuation: true,
		opacity: 		0.0,
	});

	var pGalaxy = new THREE.Geometry();	

	var count = 100000;
	var numArms = 5;
	var arm = 0;
	var countPerArm = count / numArms;
	var ang = 0;
	var dist = 0;
	for( var i=0; i<count; i++ ){
		var x = Math.cos(ang) * dist;
		var y = 0;
		var z = Math.sin(ang) * dist;

		//	scatter
		var sa = 100 - Math.sqrt(dist);				//	scatter amt
		if( Math.random() > 0.3)
			sa *= ( 1 + Math.random() ) * 4;
		x += random(-sa, sa);
		z += random(-sa, sa);

		var distanceToCenter = Math.sqrt( x*x + z*z);
		var thickness = constrain( Math.pow( constrain(90-distanceToCenter*0.1,0,100000),2) * 0.02,2,10000) + Math.random() * 120;
		y += random( -thickness, thickness);		

		// x -= 100;
		// z -= 1500;

		x *= 20;
		y *= 20;
		z *= 20;

		var p = new THREE.Vector3(x,y,z);
		p.size = 200 + constrain( 600/dist,0,32000);	
		if( Math.random() > 0.99 )
			p.size *= Math.pow(1 + Math.random(), 3 + Math.random() * 3) * .9;	
		else
			if( Math.random() > 0.7 )
				p.size *= 1 + Math.pow(1 + Math.random(), 2) * .04;

		if( i == 0 ){
			p.size = 100000;
			// p.x = -100 * 20;
			// p.y = 0;
			// p.z = -1500 * 20;;
		}
		pGalaxy.vertices.push( p );

		var r = constrain(1 - (Math.pow(dist,3)*0.00000002),.3,1) + random(-.1,.1);
		var g = constrain(0.7 - (Math.pow(dist,2)*0.000001),.41,1) + random(-.1,.1);
		var b = constrain(0.1 + dist * 0.004,.3,.6) + random(-.1,.1);	
		var c = new THREE.Color();
		c.r = r; c.g = g; c.b = b;
		pGalaxy.colors.push( c );	

		ang += 0.0002;	
		dist += .08;

		if( i % countPerArm == 0 ){
			ang = Math.PI * 2 / numArms * arm;
			dist = 0;
			arm++;
		}
	}		

	var pGalacticSystem = new THREE.Points( pGalaxy, galacticShaderMaterial );
	pGalacticSystem.attributes=galacticAttributes;
	//	set the values to the shader
	var values_size = galacticAttributes.size.value;
	var values_color = galacticAttributes.customColor.value;

	for( var v = 0; v < pGalaxy.vertices.length; v++ ) {		
		values_size[ v ] = pGalaxy.vertices[v].size;
		values_color[ v ] = pGalaxy.colors[v];
	}

	//	galactic core is 27000 ly from earth
	pGalacticSystem.position.x = 27000;	

	pGalacticSystem.add( addLensFlare(0,0,0) );

	//	make a top down image
	var galacticTopMaterial = new THREE.MeshBasicMaterial({
		map: (new THREE.TextureLoader()).load('images/galactictop.png'),
		blending: THREE.AdditiveBlending,
		depthTest: false,
		depthWrite: false,
		side: THREE.DoubleSide,
		transparent: true,
	});

	//	the milky way is about 100,000 to 120,000 LY across
	//	however the texture of the milky way is smaller than this on the plane
	//	we'll make it roughly 10% bigger than it really will be to arrive at the correct size

	//	note:
	//	normally we want to do this with one poly quad
	//	however on certain GPUs this seems to break because the quad is looking like it's attempted to be culled
	//	throwing my polygons at the problem apparently fixes this

	var plane = new THREE.Mesh( new THREE.PlaneGeometry(150000,150000, 30, 30), galacticTopMaterial );
	plane.rotation.x = Math.PI/2;
	plane.material.map.anisotropy = maxAniso;
	pGalacticSystem.add( plane );	

	//	a measurement of the galactic plane
	var measurement = createDistanceMeasurement( new THREE.Vector3( 0,0,-55000 ), new THREE.Vector3( 0,0,55000 ) );
	measurement.position.y = -1000;
	measurement.visible = false;
	attachLegacyMarker( "Milky Way ~110,000 Light Years", measurement, 1.0, {min:6000, max: 120000} );
	pGalacticSystem.add( measurement );
	measurement.rotation.x = Math.PI;

	pGalacticSystem.measurement = measurement;
	window.toggleGalacticMeasurement = function( desired ){
		if( desired == undefined )
			pGalacticSystem.measurement.visible = !this.measurement.visible;
		else
			pGalacticSystem.measurement.visible = desired;		
	}	

	//	a heat-vision skeleton of the galactic plane
	var cylinderMaterial = new THREE.MeshBasicMaterial({
		map: glowSpanTexture,
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 1.0,
	})	
	var isogeo = new THREE.IcosahedronGeometry( 40000, 4 );	
	var matrix = new THREE.Matrix4();
	matrix.scale( new THREE.Vector3(1,0,1) );
	isogeo.applyMatrix( matrix );	
	var isoball = new THREE.Mesh( isogeo, cylinderMaterial );
	isoball.material.map.wrapS = THREE.RepeatWrapping;
	isoball.material.map.wrapT = THREE.RepeatWrapping;
	isoball.material.map.needsUpdate = true;
	isoball.update = function(){
		var heatVisionValue = pSystem.shaderMaterial.uniforms.heatVision.value;
		//this.material.opacity = (1.0 - heatVisionValue);
	}
	isoball.material.map.onUpdate = function(){
		this.offset.y -= 0.0001;
		this.needsUpdate = true;
	}
	//pGalacticSystem.add( isoball );


	pGalacticSystem.update = function(){
		//	reduce the galactic particle sizes when zooming way in (otherwise massive overdraw, drop in fps, too bright..)
		galacticUniforms.zoomSize.value = 1.0 + 10000 / camera.position.z;
		
		//	scale the particles based off of screen size
		var areaOfWindow = window.innerWidth * window.innerHeight;

		galacticUniforms.scale.value = Math.sqrt(areaOfWindow) * 1.5;

		galacticTopMaterial.opacity = galacticShaderMaterial.opacity;

		//	for heat vision...
		if( pSystem ){
			var heatVisionValue = pSystem.shaderMaterial.uniforms.heatVision.value;

			if( heatVisionValue > 0 ){
				galacticTopMaterial.opacity = 1.0 - heatVisionValue;
			}

			galacticUniforms.heatVision.value = heatVisionValue;

			if( pDustSystem ){
				if( heatVisionValue > 0 )
					pDustSystem.visible = false;
				else
					pDustSystem.visible = true;
			}			

		}
		
		// console.log( galacticUniforms.zoomSize.value);
		if( camera.position.z < 2500 ){
			if( galacticShaderMaterial.opacity > 0 )
				galacticShaderMaterial.opacity -= 0.05;
		}
		else{
			if( galacticShaderMaterial.opacity < 1 )
				galacticShaderMaterial.opacity += 0.05;
		}
		

		if( galacticShaderMaterial.opacity <= 0.0 ){
			pGalacticSystem.visible = false;
			plane.visible = false;						
		}
		else{
			pGalacticSystem.visible = true;
			plane.visible = true;			
		}

		var targetLerp = constrain( Math.pow(camera.position.z / 80000,3 ), 0.0, 1.0 );
		if( targetLerp < 0.00001 )
			targetLerp = 0.0;

		galacticCentering.position.set(0,0,0);
		galacticCentering.position.lerp( this.position.clone().negate(), targetLerp );

	}

	//	position it as if the disc visible in the star data were the actual galactic disc
	pGalacticSystem.position.x = 11404;
	pGalacticSystem.position.y = 14000;
	pGalacticSystem.position.z = 10000;

	pGalacticSystem.rotation.x = 2.775557;
	pGalacticSystem.rotation.y = -0.4;
	pGalacticSystem.rotation.z = -1.099999;

	// pGalacticSystem.targetPosition = pGalacticSystem.position.clone();
	// pGalacticSystem.zeroRotation = new THREE.Vector3();
	// pGalacticSystem.targetRotation = pGalacticSystem.rotation.clone();



	// pGalacticSystem.scale.x = pGalacticSystem.scale.y = pGalacticSystem.scale.z = 100;	
	return pGalacticSystem;
}