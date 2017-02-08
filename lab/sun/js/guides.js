//THREE.ImageUtils.crossOrigin = null;
var guidePointTexture = (new THREE.TextureLoader()).load( "images/p_1.png" );

function createSpaceRadius( radius, color, representationScale ){
	color = color ? color : 0xffffff;
	representationScale = representationScale ? representationScale : 1;

	var width = Math.sqrt(radius) * 0.00001 * representationScale;
	var thickness = radius * 0.0005;
	var textureRepeat = 30;

	var resolution = 180;
	var twoPI = Math.PI * 2;
	var angPerRes = twoPI / resolution;	
	var verts = [];
	for( var i=0; i<twoPI; i+=angPerRes ){
		var x = Math.cos( i ) * radius;
		var y = Math.sin( i ) * radius;
		var v = new THREE.Vector3( x,y,0 );
		verts.push( v );
	}

	var geometry = new THREE.Geometry();
	geometry.vertices = verts;


	var areaOfWindow = window.innerWidth * window.innerHeight;

	var pointSize = 0.000004 * areaOfWindow;

	var particleMaterial = new THREE.ParticleBasicMaterial( 
		{
			color: color, 
			size: pointSize, 
			sizeAttenuation: false, 
			map: guidePointTexture,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			depthWrite: false,
		} 
	);

	var mesh = new THREE.ParticleSystem( geometry, particleMaterial );

	mesh.update = function(){
		if( camera.position.z < 2.0 )
			this.visible = false
		else
		if( camera.position.z < 800)
			this.visible = true;
		else
			this.visible = false;
	}
	
	mesh.rotation.x = Math.PI/2;
	return mesh;
}

function createDistanceMeasurement( vecA, vecB ){
	var geometry = new THREE.Geometry();
	var distance = vecA.distanceTo( vecB );
	var height = distance * 0.04;
	var bufferSpace = 0.38;

	/*
		vecA--------vecAMargin .....bufferspace	..... vecBMargin--------vecB		
		|																   |
		clamperA													clamperB
	*/

	var upwards = new THREE.Vector3( 0, 0, 0 );
	var downwards = new THREE.Vector3( 0, -height, 0 );
	var clamperA = vecA.clone().add( downwards );
	var clamperB = vecB.clone().add( downwards );
	vecA.add( upwards );
	vecB.add( upwards );	

	var center = vecA.clone().lerp( vecB, 0.5 );
	vecAMargin = vecA.clone().lerp( vecB, bufferSpace );
	vecBMargin = vecB.clone().lerp( vecA, bufferSpace );

	geometry.vertices.push( clamperA );
	geometry.vertices.push( vecA );
	geometry.vertices.push( vecAMargin );	//	double down on the margin vertex to create a solid to transparent separation
	geometry.vertices.push( vecAMargin );
	geometry.vertices.push( vecBMargin );
	geometry.vertices.push( vecBMargin );
	geometry.vertices.push( vecB );
	geometry.vertices.push( clamperB );

	var solid = new THREE.Color(0x888888);
	var nonsolid = new THREE.Color(0x000000);

	geometry.colors.push( solid );
	geometry.colors.push( solid );
	geometry.colors.push( solid );
	geometry.colors.push( nonsolid );
	geometry.colors.push( nonsolid );
	geometry.colors.push( solid );
	geometry.colors.push( solid );
	geometry.colors.push( solid );

	var material = new THREE.LineBasicMaterial(
		{
			color: 0xffffff,
			depthTest: false,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true,
		}
	);
	var mesh = new THREE.Line( geometry, material );	
	return mesh;
}