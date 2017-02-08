

function makeSunEarthDiagram(){
	var sunEarthDiagram = new THREE.Object3D();

	var distanceToEarth = KMToLY(150000000);
	var lineGeo = new THREE.Geometry();
	lineGeo.vertices.push( new THREE.Vector3(0,0,0) );
	lineGeo.vertices.push( new THREE.Vector3(distanceToEarth,0,0) );
	var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color:0xffffff}));
	sunEarthDiagram.add( line );	
	
	var earthGyro = new THREE.Gyroscope();
	earthGyro.position.x = distanceToEarth;	
	sunEarthDiagram.add( earthGyro );	
	var earthCallout = makeClamper(0.0000025);	
	earthGyro.add( earthCallout );

	earthGyro.name = "Sun";
	attachMarker( earthGyro, 0.001 );

	var sunGyro = new THREE.Gyroscope();
	sunEarthDiagram.add( sunGyro );
	var sunCallout = makeClamper(0.000003);
	sunGyro.add( sunCallout );
	
	translating.add(sunEarthDiagram);
}
var loader=new THREE.TextureLoader();
var clamperTexture = loader.load( 'images/clamper.png' );
var clamperMaterial = new THREE.MeshBasicMaterial({
	map: clamperTexture,
	depthTest: false,
	depthWrite: false,
	transparent: true,
	side: THREE.DoubleSide,
	blending: THREE.AdditiveBlending
});

function makeClamper( scale ){
	clamperTexture.anisotropy = maxAniso;
	var plane = new THREE.Mesh( new THREE.PlaneGeometry(1,1), clamperMaterial );
	plane.scale.setLength( scale );
	return plane;
}

function displaySunEarthDiagram(){
}

function highlightStarHeat(){
	var seconds = 6.0;
	toggleHeatVision( true );
	setTimeout( function(){
		toggleHeatVision( false );
	}, seconds * 1000.0 )
}

function highlightMilkyWay(){
	var seconds = 6.0;
	toggleGalacticMeasurement( true );
	setTimeout( function(){
		toggleGalacticMeasurement( false );
	}, seconds * 1000.0 )	
}