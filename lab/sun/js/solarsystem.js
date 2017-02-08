function makeOortCloud(){
	//	distance to oort cloud
	//		about 50,000 AU
	//	1 Astronomical Unit = 1.58128588 × 10^-5 light years
	//		50,0000 AU ~= 0.790642941 LY

	/*
	var dist = 0.790642941;
	var distrib = 0.1;
	var particlesGeo = new THREE.Geometry();
	for( var i=0; i<10000; i++ ){
		var x = random(-1,1);
		var y = random(-1,1);
		var z = random(-1,1);
		var vec = new THREE.Vector3(x,y,z);
		vec.setLength( dist );

		var multDistr = distrib;
		if( Math.random() > 0.98 )
			multDistr = Math.pow( multDistr, 1 + Math.random() * 6)

		vec.x += random(-multDistr,multDistr);
		vec.y += random(-multDistr,multDistr);
		vec.z += random(-multDistr,multDistr);
		particlesGeo.vertices.push( vec );
	}

	var material = new THREE.ParticleBasicMaterial({color:0x333333, size: 0.1});
	var particles = new THREE.ParticleSystem( particlesGeo, material );
	*/

	var count = 10000;
	var dist = 0.790642941;
	var distrib = 0.1;

	var particlesGeo = new THREE.BufferGeometry();
	particlesGeo.attributes = {
		position: {
			itemSize: 3,
			array: new Float32Array( count * 3 ),
			numItems: count * 3
		}
	};

	var vector = new THREE.Vector3();
	var positions = particlesGeo.attributes.position.array;

	for( var i=0; i<positions.length; i+=3 ){
		vector.x = random(-1,1);
		vector.y = random(-1,1);
		vector.z = random(-1,1);
		vector.setLength( dist );

		var multDistr = distrib;
		if( Math.random() > 0.98 )
			multDistr = Math.pow( multDistr, 1 + Math.random() * 6)

		vector.x += random(-multDistr,multDistr);
		vector.y += random(-multDistr,multDistr);
		vector.z += random(-multDistr,multDistr);
		positions[i] = vector.x;
		positions[i+1] = vector.y;
		positions[i+2] = vector.z;
	}

	particlesGeo.computeBoundingSphere();

	var material = new THREE.ParticleBasicMaterial({color:0x333333, size: 0.1});
	var particles = new THREE.ParticleSystem( particlesGeo, material );

	var oortInfo = new THREE.Gyroscope();
	oortInfo.name = "Oort Cloud";
	oortInfo.position.set( dist, -dist , 0 );
	oortInfo.scale.setLength( 0.1 );
	attachLegacyMarker( "Oort Cloud", oortInfo, 1.0, {min:40.0, max: 500.0}  );

	particles.add( oortInfo );

	return particles;
}

function makeKuiperBelt(){
	//	distance to kuiper belt
	//		about 30-50 AU, we'll say it's about 40
	//	1 Astronomical Unit = 1.58128588 × 10^-5 light years
	//		40 AU ~= 0.000632514353 LY

	var dist = 0.000632514353;
	// var 
}

function makeSolarSystem(){
	var solarSystem = new THREE.Object3D();

	var oortCloud = makeOortCloud();
	solarSystem.add( oortCloud );

	// var kuiperBelt = makeKuiperBelt();
	// solarSystem.add( kuiperBelt );

	

	// var solarSystemSphere = new THREE.Mesh( new THREE.SphereGeometry(0.790642941) );
	// solarSystem.add( solarSystemSphere );		

	// sun = makeSun(
	// 	{
	// 		radius: 7.35144e-8
	// 	}
	// );

	// sun.configure(
	// {
		
	// });

	// solarSystem.add( sun );

	// represent the orbit path of planetry bodies in the solar system
	//	use kilometers and convert to light years
	//	mercury
	var mercuryOrbit = createSpaceRadius( KMToLY(55000000), /*0x90745D*/ 0xffffff );
	solarSystem.add( mercuryOrbit );
	var mercury = createPlanet( 55000000, 2439.7 );
	solarSystem.add( mercury );
	attachLegacyMarker( "Mercury", mercury, 1.0, {min:3.4, max: 8.0} );	

	//	venus
	var venusOrbit = createSpaceRadius( KMToLY(108000000), /*0x9E4738*/ 0xffffff );
	solarSystem.add( venusOrbit );
	var venus = createPlanet( 108000000, 6051.8 );
	solarSystem.add( venus );
	attachLegacyMarker( "Venus", venus, 1.0, {min:3.6, max: 8.2} );	

	//	earth
	var earthOrbit = createSpaceRadius( KMToLY(150000000), /*0x887F98*/ 0xffffff );
	solarSystem.add( earthOrbit );

	var earth = createPlanet( 150000000, 6378.1 );
	// var earthGeo = new THREE.SphereGeometry( KMToLY(12756.2), 12, 8 );
	// earth = new THREE.Mesh( earthGeo, 
	// 	new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( "images/earth.png" )} ) 
	// );
	// earth.position.x = KMToLY(150000000);
	solarSystem.add( earth );

	earth.name = "Earth";
	attachLegacyMarker( "Earth", earth, 1.0, {min:3.8, max: 8.4} );

	//	the moon? sure why not...
	// you can't even see it...
	earth.add( createSpaceRadius( KMToLY(402652), 0xffffff, 16.0 ) );

	//	mars
	solarSystem.add( createSpaceRadius( KMToLY(230000000), /*0xCE6747*/ 0xffffff ) );	
	var mars = createPlanet( 230000000, 3396.2 );
	solarSystem.add( mars );
	attachLegacyMarker( "Mars", mars, 1.0, {min:4.0, max: 8.6} );

	//	jupiter
	solarSystem.add( createSpaceRadius( KMToLY(778000000), /*0xCE6747*/ 0xffffff ) );
	var jupiter = createPlanet( 778000000, 71492.2 );
	solarSystem.add( jupiter );
	attachLegacyMarker( "Jupiter", jupiter, 1.0, {min:8.0, max: 17.2} );

	//	saturn
	solarSystem.add( createSpaceRadius( KMToLY(1400000000), /*0xCE6747*/ 0xffffff ) );
	var saturn = createPlanet( 1400000000, 60268 );
	solarSystem.add( saturn );
	attachLegacyMarker( "Saturn", saturn, 1.0, {min:8.0, max: 17.6} );

	//	uranus
	solarSystem.add( createSpaceRadius( KMToLY(3000000000), /*0xCE6747*/ 0xffffff ) );
	var uranus = createPlanet( 3000000000, 25559 );
	solarSystem.add( uranus );
	attachLegacyMarker( "Uranus", uranus, 1.0, {min:8.0, max: 18.0} );

	//	neptune
	solarSystem.add( createSpaceRadius( KMToLY(4500000000), /*0xCE6747*/ 0xffffff ) );
	var neptune = createPlanet( 4500000000, 24764  );
	solarSystem.add( neptune );
	attachLegacyMarker( "Neptune", neptune, 1.0, {min:8.0, max: 20.0} );

	solarSystem.dynamic = true;

	var measurement = createDistanceMeasurement( new THREE.Vector3( 0,0,0 ), new THREE.Vector3( 1,0,0 ) );
	measurement.position.y = 0.08;
	measurement.update = function(){
		if( camera.position.z > 120 && camera.position.z < 400 ){
			this.visible = true;
		}
		else{
			this.visible = false;
		}
	}
	measurement.visible = true;
	var sub = new THREE.Object3D();
	sub.position.x = 0.5;
	sub.position.y = 0.08;
	measurement.add( sub );
	attachLegacyMarker( "One light year.", sub, 1.0, {min:120, max: 400} );
	solarSystem.add( measurement );	

	//	pioneer
	//	18220700000 KM out

	oortCloud.update = function(){
		if( camera.position.z > 40 && camera.position.z < 600 )
			this.visible = true;
		else
			this.visible = false;
	}

	//makeSunEarthDiagram();

	//	pluto?
	//	still not a planet	
	return solarSystem;
}

function createPlanet( distanceToSunKM, radiusKM ){
	var planetGeo = new THREE.SphereGeometry( KMToLY( radiusKM ), 12, 8 );
	var planet = new THREE.Mesh( planetGeo );
	planet.position.x = KMToLY(distanceToSunKM);
	return planet;	
}
