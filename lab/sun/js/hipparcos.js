function loadStarData( dataFile, callback ){
	var xhr = new XMLHttpRequest();
	setLoadMessage("Fetching stellar data");	
	xhr.addEventListener( 'load', function ( event ) {
		var parsed = JSON.parse( xhr.responseText );
		// console.log(parsed);
		if( callback ){		
			setLoadMessage("Parsing stellar data");	
			callback(parsed);			
		}
	}, false );
	xhr.open( 'GET', dataFile, true );
	xhr.send( null );
}

var loader=new THREE.TextureLoader();
//	points in the sky in HIPPARCOS star cluster
var datastarTexture0 = loader.load( "images/p_0.png" );
var datastarTexture1 = loader.load( "images/p_2.png" );
var datastarHeatVisionTexture = loader.load( "images/sharppoint.png" );

//	bright flashy named stars graphic
var starPreviewTexture = loader.load( 'images/star_preview.png', undefined, setLoadMessage("Focusing optics")	);
var starColorGraph = loader.load( 'images/star_color_modified.png' );

var datastarUniforms = {
	color:     { type: "c", value: new THREE.Color( 0xffffff ) },
	texture0:   { type: "t", value: datastarTexture0 },
	texture1:   { type: "t", value: datastarTexture1 },
	heatVisionTexture: { type: "t", value: datastarHeatVisionTexture },
	spectralLookup: {type: "t", value: starColorGraph },
	idealDepth: { type: "f", value: 1.0 },
	blurPower: { type: "f", value: 1.0 },
	blurDivisor: { type: "f", value: 2.0 },
	sceneSize: { type: "f", value: 120.0 },
	cameraDistance: { type: "f", value: 800.0 },
	zoomSize: 	{ type: "f", value: 1.0 },
	scale: { type: "f", value: 1.0 },
	brightnessScale: { type: "f", value: 1.0 },
	heatVision: { type: "f", value: 0.0 },
};

var datastarAttributes = {
	size: 			{ type: 'f', value: [] },
	customColor: 	{ type: 'c', value: [] },
	colorIndex: 	{ type: 'f', value: [] },
};

function generateHipparcosStars(){
	var container = new THREE.Object3D();

	var pGeo = new THREE.Geometry();
	var count = starData.length;

	var starPreviews = new THREE.Object3D();
	container.add(starPreviews);

	var starPreviewMaterial = new THREE.MeshBasicMaterial({
		map: starPreviewTexture,
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,
	});

	var starPreview = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), starPreviewMaterial );

	var pLineGeo = new THREE.Geometry();

	for( var i=0; i<count; i++ ){
		var star = starData[i];

		//	original data is in parsecs
		//	we need to convert these into light years
		//	in this case 1.0 GL unit is a light year...

		//	data comes in parsecs
		//	need to convert this to LY
		var distance = star.d * 3.26156;

		//	stars with error data?
		if( distance >= 10000000 ){
			// console.log( star );
			star.position = new THREE.Vector3();
			continue;
		}

		//	this sucks but we have to make a special case for the sun
		if( i == 0 ){
			lat = 0;
			lon = 0;
			distance = 0;
		}

		var p = new THREE.Vector3(0,0,0);

		var ra = star.ra;
		var dec = star.dec;

		//	using this method
		//	http://math.stackexchange.com/questions/52936/plotting-a-stars-position-on-a-2d-map
		var phi = (ra+90) * 15 * Math.PI/180;
		var theta = dec * Math.PI/180;
		var rho = distance;
		var rvect = rho * Math.cos( theta );
		var x = rvect * Math.cos( phi );
		var y = rvect * Math.sin( phi );
		var z = rho * Math.sin( theta );

		p.set(x,y,z);

		/*
		//	using galactic coordinates
		var latlon = EquatorialToGalactic( ra, dec );
		var lat = latlon.lat;
		var lon = latlon.lon;

		star.lat = lat;
		star.lon = lon;

        var phi = Math.PI/2 - lat;
        var theta = 2 * Math.PI - lon;

        p.x = Math.sin(phi) * Math.cos(theta) * distance;
        p.y = -Math.cos(phi) * distance;
        p.z = Math.sin(phi) * Math.sin(theta) * distance;

        star.position = p;
        */

        //	using astronexus coordinates
        /*
		var x = star.x * 3.26156;
		var y = star.y * 3.26156;
		var z = star.z * 3.26156;
		*/

		// console.log( star.position );

		// p.size = 0.16;
		p.size = 20.0;
		p.name = star.name;
		p.spectralIndex = star.c;

		//	what to do with stars that have bad spectral data?
		if( star.c <= -1 )
			star.c = 0;

		p.spectralLookup = map( star.c, -0.3, 1.52, 0, 1);
		// console.log( star.c + " --> " + p.spectralLookup );


		if( i == 0 )
			p.size = 0;

		pGeo.vertices.push( p );

		var r = 1, g = 1, b = 1;
		var c = new THREE.Color();
		c.r = r; c.g = g; c.b = b;
		pGeo.colors.push( c );
	}

	var matrix = new THREE.Matrix4();
	var angle = new THREE.Euler(Math.PI/2,Math.PI,-Math.PI/2);
	var quat = new THREE.Quaternion();
	quat.setFromEuler( angle );
	matrix.makeRotationFromQuaternion( quat );

	// matrix.scale( new THREE.Vector3(1,-1,1) );
	pGeo.applyMatrix( matrix );


	for( var i in pGeo.vertices ){
		var p = pGeo.vertices[i];
		if( p.name === undefined )
			continue;
		if( p.name.length > 0 ){

			//	make a line from base plane to star
			pLineGeo.vertices.push( p.clone() );
			var base = p.clone();
			base.y = 0;
			pLineGeo.vertices.push( base );

			//	create a star sprite highlighting it
			var preview = starPreview.clone();
			var gyroStar = new THREE.Gyroscope();
			gyroStar.position.copy( p );
			gyroStar.add( preview );

			//	give it an update based on camera...
			preview.update = function(){
				this.material.opacity = constrain( Math.pow(camera.position.z * 0.002,2), 0, 1);
				if( this.material.opacity < 0.1 )
					this.material.opacity = 0.0;
				if( this.material <= 0.0 )
					this.visibile = false;
				else
					this.visible = true;
				this.scale.setLength( constrain( Math.pow(camera.position.z * 0.001,2), 0, 1) )
			}

			//	create a self contained gyroscope for the star marker
			var g = new THREE.Gyroscope();
			container.add(g);

			// starPreview.name = star.name;
			g.name = p.name;
			g.spectralIndex = p.spectralIndex;
			// console.log(g.name);
			g.position.copy(p);
			g.scale.setLength( 0.2 );
			attachMarker( g );

			starPreviews.add( gyroStar );


		}
	}

	var shaderMaterial = new THREE.ShaderMaterial( {
		uniforms: 		datastarUniforms,
//		attributes:     datastarAttributes,
		vertexShader:   shaderList.datastars.vertex,
		fragmentShader: shaderList.datastars.fragment,

		blending: 		THREE.AdditiveBlending,
		depthTest: 		false,
		depthWrite: 	false,
		transparent:	true,

		// blending: 		THREE.NormalBlending,
		// depthTest: 		true,
		// depthWrite: 	true,
		// transparent:	false,
		// sizeAttenuation: false,

		// blending: 		THREE.NormalBlending,
		// depthTest: 		true,
		// depthWrite: 	true,
		// transparent:	false,
	});

	container.heatVision = false;
	container.shaderMaterial = shaderMaterial;

	container.toggleHeatVision = function( desired ){

		if( desired !== undefined )
			container.heatVision = !desired;

		if( container.heatVision == false ){
			container.shaderMaterial.blending = THREE.NormalBlending;
			container.shaderMaterial.depthTest = true;
			container.shaderMaterial.depthWrite = true;
			container.shaderMaterial.transparent = false;
		}
		else{
			container.shaderMaterial.blending = THREE.AdditiveBlending;
			container.shaderMaterial.depthTest = false;
			container.shaderMaterial.depthWrite = false;
			container.shaderMaterial.transparent = true;
		}

		container.heatVision = !container.heatVision;

		if( container.heatVision ){
			// $spectralGraph.css({opacity:1});
			$spectralGraph.addClass('heatvision').fadeIn();
			$iconNav.addClass('heatvision');
		}
		else{
			// $spectralGraph.css({opacity:0});
			$spectralGraph.removeClass('heatvision').fadeOut();
			$iconNav.removeClass('heatvision');
		}
	}

	window.toggleHeatVision = container.toggleHeatVision;

	var pSystem = new THREE.Points( pGeo, shaderMaterial );
	pSystem.attributes=datastarAttributes;
	pSystem.dynamic = false;

	//	set the values to the shader
	var values_size = datastarAttributes.size.value;
	var values_color = datastarAttributes.customColor.value;
	var values_spectral = datastarAttributes.colorIndex.value;

	for( var v = 0; v < pGeo.vertices.length; v++ ) {
		values_size[ v ] = pGeo.vertices[v].size;
		values_color[ v ] = pGeo.colors[v];
		values_spectral[ v ] = pGeo.vertices[v].spectralLookup;
	}

	//	-----------------------------------------------------------------------------
	//	attach lines from star to plane base
	var lineMesh = new THREE.Line( pLineGeo, new THREE.LineBasicMaterial({
		color: 			0x333333,
		blending: 		THREE.AdditiveBlending,
		depthTest: 		false,
		depthWrite: 	false,
		transparent:	true,

	}), THREE.LinePieces );
	pSystem.add( lineMesh );

	//	-----------------------------------------------------------------------------
	//	create a ring of degree marks around the plane
	var degCounter = 12;
	var radius = 600;
	for(var i=0; i<degCounter; i++ ){
		var degrees = i / degCounter * 360;
		var zerodeg = new THREE.Gyroscope();
		zerodeg.scale.setLength(0.8);
		var angle = i / degCounter * Math.TWO_PI;
		var x = Math.cos( angle ) * radius;
		var y = Math.sin( angle ) * radius;
		zerodeg.position.x = x;
		zerodeg.position.z = -y;
		zerodeg.name = degrees + "°";
		attachMarker( zerodeg, 1 );
		container.add( zerodeg );
	}

	//	-----------------------------------------------------------------------------
	//	create base circles for each named star on the plane
	var starBaseTexture = loader.load( 'images/starbase.png');
	var starBaseMaterial = new THREE.MeshBasicMaterial({
		map: starBaseTexture,
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		side: THREE.DoubleSide,
	});
	var starBaseGeometry = new THREE.PlaneGeometry( 10, 10 );
	var matrix = new THREE.Matrix4();
	//	seriously?
	var euler = new THREE.Euler( Math.PI/2,0,0);
	var quat = new THREE.Quaternion();
	quat.setFromEuler( euler );
	matrix.makeRotationFromQuaternion( quat );
	
	starBaseGeometry.applyMatrix(matrix);
	var baseGeometryCombined = new THREE.Geometry();
	var circles = new THREE.Object3D();
	for( var i in pGeo.vertices ){
		var p = pGeo.vertices[i];
		if( p.name!==undefined && p.name.length > 0 ){
			var geo = starBaseGeometry.clone();
			var geoMatrix = new THREE.Matrix4();
			geoMatrix.setPosition( p.x, 0, p.z );
			geo.applyMatrix( geoMatrix );
			THREE.GeometryUtils.merge( baseGeometryCombined, geo );
		}
	}
	var starBases = new THREE.Mesh( baseGeometryCombined, starBaseMaterial );
	starBases.update = function(){
		this.material.opacity = constrain( (camera.position.z - 400.0) * 0.002, 0, 1);
		if( this.material.opacity <=0 )
			this.visible = false;
		else
			this.visible = true;
	}
	pSystem.add( starBases );


	//	-----------------------------------------------------------------------------
	//	add everything to the container
	container.add( pSystem );

	//	-----------------------------------------------------------------------------
	//	give it an update function to handle transitions
	container.update = function(){
		var blueshift = (camera.position.z + 5000.0)/60000.0;
		blueshift = constrain( blueshift, 0.0, 0.2 );

		var brightnessScale = constrain( 10/ Math.sqrt(camera.position.z), 0, 1);

		// console.log(blueshift);
		if( container.heatVision ){
			datastarUniforms.cameraDistance.value = 0.0;
			datastarUniforms.brightnessScale.value = 1.0;
			datastarUniforms.heatVision.value += (1.0-datastarUniforms.heatVision.value) * 0.2;
		}
		else{
			datastarUniforms.brightnessScale.value = brightnessScale;
			datastarUniforms.heatVision.value += (0.0-datastarUniforms.heatVision.value) * 0.2;
		}

		if( datastarUniforms.heatVision.value < 0.01 )
			datastarUniforms.heatVision.value = 0.0;

		datastarUniforms.cameraDistance.value = blueshift;
		datastarUniforms.zoomSize.value = constrain(( camera.position.z ) / 4000,0,1);

		var areaOfWindow = window.innerWidth * window.innerHeight;
		datastarUniforms.scale.value = Math.sqrt(areaOfWindow) * 1.5;

		if( camera.position.z < 1500 ){
			// controllers.datastarSize += (0.8 - controllers.datastarSize) * 0.02;
			// controllers.sceneSize += (10000 - controllers.sceneSize) * 0.06;
		}
		else{
			// controllers.datastarSize += (3.0 - controllers.datastarSize) * 0.02;
			// controllers.datastarSize += (3.0 - controllers.datastarSize) * 0.02;
			// controllers.sceneSize += (5000.0 - controllers.sceneSize) * 0.06;

		}

		//	some basic LOD
		// if( camera.position.z > 400 && camera.position.z < 40000 )
		// 	pSystem.visible = true;
		// else
		// 	pSystem.visible = false;

		// datastarUniforms.sceneSize.value = controllers.sceneSize
		// datastarUniforms.scale.value = controllers.datastarSize;

		datastarUniforms.sceneSize.value = 10000;
	}

	lineMesh.update = function(){
		if( camera.position.z < 1500 ){
			this.material.opacity = constrain( (camera.position.z - 400.0) * 0.002, 0, 1); 
		}
		else{
			this.material.opacity += (0.0 - this.material.opacity) * 0.1;
		}

		//	some basic LOD
		if( camera.position.z < 250 )
			this.visible = false;
		else
			this.visible = true;
	}

	return container;
}
