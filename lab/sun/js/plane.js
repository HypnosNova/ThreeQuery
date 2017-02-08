var glowSpanTexture = (new THREE.TextureLoader()).load('images/glowspan.png');

function createSpacePlane(){
	var cylinderMaterial = new THREE.MeshBasicMaterial({
		map: glowSpanTexture,
		blending: THREE.AdditiveBlending,
		transparent: true,
		depthTest: false,
		depthWrite: false,		
		wireframe: true,
		opacity: 0,
	})
	var cylinderGeo = new THREE.CylinderGeometry( 600, 0, 0, (360/8) - 1, 100 );
	// var cylinderGeo = new THREE.IcosahedronGeometry( 600, 6 );
	var matrix = new THREE.Matrix4();
	matrix.scale( new THREE.Vector3(1,0,1) );
	cylinderGeo.applyMatrix( matrix );
	var mesh = new THREE.Mesh( cylinderGeo, cylinderMaterial );
	mesh.material.map.wrapS = THREE.RepeatWrapping;
	mesh.material.map.wrapT = THREE.RepeatWrapping;
	mesh.material.map.needsUpdate = true;
	mesh.material.map.onUpdate = function(){
		this.offset.y -= 0.001;
		this.needsUpdate = true;
	}

	var updatePlaneMaterial = function(){
		if( camera.position.z < 1500 ){
			this.material.opacity = constrain( (camera.position.z - 400.0) * 0.002, 0, 0.5); 
			if( this.material.map !== undefined && this.material.opacity <= 0.001 ){
				this.material.map.offset.y = 0.0;
				this.material.map.needsUpdate = true;
			}

			if( this.material.opacity <= 0 )
				this.visible = false;
			else
				this.visible = true;
		}
		else{
			this.material.opacity += (0.0 - this.material.opacity) * 0.1;
		}

		//	some basic LOD
		if( camera.position.z < 400 )
			this.visible = false;
		else
			this.visible = true;		
	}

	mesh.update = updatePlaneMaterial;
	translating.add( mesh );

	var lines = new THREE.Geometry();
	lines.vertices.push( new THREE.Vector3(0,0,-600) );
	lines.vertices.push( new THREE.Vector3(0,0,600) );
	lines.vertices.push( new THREE.Vector3(-600,0,0) );
	lines.vertices.push( new THREE.Vector3(600,0,0) );
	mesh = new THREE.Line( lines, new THREE.LineBasicMaterial(
		{ 
			color: 0x111144, 
			blending: THREE.AdditiveBlending,
			transparent: true,
			depthTest: false,
			depthWrite: false,		
			wireframe: true,
			linewidth: 2,
		}), THREE.LinePieces );
	mesh.update = updatePlaneMaterial;
	return mesh;
}