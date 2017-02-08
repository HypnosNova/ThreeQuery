var loader=new THREE.TextureLoader();
var dustTexture = loader.load( "images/dust.png" );

var dustUniforms = {
	color:     { type: "c", value: new THREE.Color( 0xffffff ) },
	scale: 		{ type: 'f', value: 1.0 },
	texture0:   { type: "t", value: dustTexture },
	cameraPitch: { type: "f", value: 0 },
};

var dustAttributes = {
	size: 			{ type: 'f', value: [] },	
	customColor: 	{ type: 'c', value: [] }
};

function generateDust(){

	var dustShaderMaterial = new THREE.ShaderMaterial( {
		uniforms: 		dustUniforms,
//		attributes:     dustAttributes,
		vertexShader:   shaderList.galacticdust.vertex,
		fragmentShader: shaderList.galacticdust.fragment,

		blending: 		THREE.SubtractiveBlending,
		depthTest: 		false,
		depthWrite: 	false,
		transparent:	true,
		sizeAttenuation: false,		
	});	

	var pGalacticDust = new THREE.Geometry();	

	var count = 10000;
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
		var sa = 120 - Math.sqrt(dist);				//	scatter amt
		if( Math.random() > 0.3)
			sa *= ( 1 + Math.random() ) * 4;
		x += random(-sa, sa);
		z += random(-sa, sa);

		var distanceToCenter = Math.sqrt( x*x + z*z);
		var thickness = constrain( Math.pow( constrain(60-distanceToCenter*0.1,0,100000),2) * 0.02,2,10000) + Math.random() * 20;
		y += random( -thickness, thickness);		

		x *= 20;
		y *= 20;
		z *= 20;

		var p = new THREE.Vector3(x,y,z);
		p.size = 140 + constrain( 300/dist,0,8000);	
		if( Math.random() > 0.99 )
			p.size *= Math.pow(1 + Math.random(), 4 + Math.random() * 3) * .2;			

		pGalacticDust.vertices.push( p );
		
		var r = 1;
		var g = 1;
		var b = 1;
		var c = new THREE.Color();
		c.r = r; c.g = g; c.b = b;
		pGalacticDust.colors.push( c );	

		ang -= 0.0012;	
		dist += .5;

		if( i % countPerArm == 0 ){
			ang = Math.PI * 2 / numArms * arm;
			dist = 0;
			arm++;
		}
	}		

	pDustSystem = new THREE.Points( pGalacticDust, dustShaderMaterial );
	pDustSystem.attributes=dustAttributes;
	//	set the values to the shader
	var values_size = dustAttributes.size.value;
	var values_color = dustAttributes.customColor.value;

	for( var v = 0; v < pGalacticDust.vertices.length; v++ ) {		
		values_size[ v ] = pGalacticDust.vertices[v].size;
		values_color[ v ] = pGalacticDust.colors[v];
	}
	var twoPI = Math.PI * 2;
	pDustSystem.update = function(){		

		dustUniforms.cameraPitch.value = rotating.rotation.x;		
		while( dustUniforms.cameraPitch.value > twoPI ){
			dustUniforms.cameraPitch.value -= twoPI;
		}

		while( dustUniforms.cameraPitch.value < -twoPI ){
			dustUniforms.cameraPitch.value += twoPI;
		}		

		//	scale the particles based off of screen size
		var areaOfWindow = window.innerWidth * window.innerHeight;
		dustUniforms.scale.value = areaOfWindow / 720.0;

		if( camera.position.z < 2500 ){
			if( dustShaderMaterial.opacity > 0 )
				dustShaderMaterial.opacity -= 0.05;
		}
		else{
			if( dustShaderMaterial.opacity < 1 )
				dustShaderMaterial.opacity += 0.05;
		}

		if( dustShaderMaterial.opacity <= 0.0 ){
			pDustSystem.visible = false;				
		}
		else{
			pDustSystem.visible = true;			
		}		
	}

	return pDustSystem;
}