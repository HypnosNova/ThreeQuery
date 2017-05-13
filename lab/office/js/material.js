var materialAll={};

materialAll.wallMaterial = new THREE.MeshLambertMaterial({
	color: 0xffeebb
});

materialAll.deskFeetMaterial = new THREE.MeshLambertMaterial({
	color: 0x11222a
});

materialAll.windowBorderMaterial = new THREE.MeshLambertMaterial({
	color: 0x224444
});

materialAll.GrassFootMaterial = new THREE.MeshLambertMaterial({
	color: 0xddddee
});

materialAll.shelfBarMaterial = new THREE.MeshLambertMaterial({
	color: 0xffffff
});

materialAll.GrassFlurMaterial = new THREE.MeshLambertMaterial({
	color: 0xeeeeee,
	transparent:true,
	opacity:0.8
});

materialAll.glassMaterial = new THREE.MeshLambertMaterial({
	color: 0xeeeeff,
	transparent:true,
	opacity:0.2
});