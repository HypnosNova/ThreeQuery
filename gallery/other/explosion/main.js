var [scene, renderer, camera] = $$.init();
$$.animate();
$$.actionInjections.push(function() {
	TWEEN.update()
})

$$.Controls.createOrbitControls({});

var settings = {
	letterTimeOffset: 0.075
};

function init() {
	camera.position.set(0, 0, 250);

	new THREE.FontLoader().load('font/loadFont.js', function(font) {
		var mesh1 = createManyAnimationMesh([new THREE.BoxGeometry(30, 30, 30, 3, 3, 3), new THREE.BoxGeometry(30, 30, 30, 3, 3, 3), new THREE.BoxGeometry(30, 30, 30, 3, 3, 3)], [{
			x: 0,
			y: 0,
			z: 0
		}, {
			x: 0,
			y: 30,
			z: 0
		}, {
			x: -30,
			y: 0,
			z: 0
		}], {
			timeOffset: 0.3
		});
		var mesh2 = createTextAnimationMesh("hello", {
			size: 36,
			height: 8,
			font: font,
			curveSegments: 12,
			bevelEnabled: true,
			bevelSize: 1,
			bevelThickness: 1
		}, {
			timeOffset: 0.3
		});
		var mesh3 = createAnimationMesh(new THREE.BoxGeometry(30, 30, 30, 3, 3, 3));
		scene.add(mesh1);
		scene.add(mesh2);
		scene.add(mesh3);
		
		mesh1.position.set(-50,50,0);
		mesh2.position.set(30,0,0);
		mesh3.position.set(-50,-50,0);

		var light = new THREE.DirectionalLight(0xff0000, 1.0);
		light.position.set(0.2, 0.5, 1);
		scene.add(light);
		var light = new THREE.AmbientLight(0x404040);
		scene.add(light);

		new TWEEN.Tween(mesh1).to({
			time: mesh1.animationDuration
		}, 8000).start().yoyo(true).repeat(Infinity);
		
		new TWEEN.Tween(mesh2).to({
			time: mesh2.animationDuration
		}, 6000).start().yoyo(true).repeat(Infinity);
		
		new TWEEN.Tween(mesh3).to({
			time: mesh3.animationDuration
		}, 4000).start().yoyo(true).repeat(Infinity);
	});
}

init();