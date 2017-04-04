function loadSource(){
	$$.loadSound(soundArr);
	$$.loadTexture(["texture/skybox.jpg",
		"texture/waternormals.jpg",
		"transition/transition1.png",
		"texture/stone.jpg",
		"texture/emptyPan.jpg",
		"texture/scorePan.jpg",
		"texture/1.jpg",
		"texture/2.jpg",
		"texture/3.jpg",
		"texture/pan.jpg"]);
	$$.loadFont(["font/tahomabd.ttf"]);
	
}
var curvePanManager;
$$.onLoadComplete=function(){
	curvePanManager=new CurvePanManager();
	var mainScene=createMainScene();
	transition = new $$.Transition(mainScene, {}, $$.global.RESOURCE.textures["transition/transition1.png"]);
	$$.actionInjections.push(transition.render);
}

loadSource();

function createLoadingScene() {
	var world = new $$.SubWorld({
		clearColor: 0x000000
	});
	world.camera.position.set(10, 10, 10);
	var geometry = new THREE.BoxGeometry(5, 5, 5);
	var material = new THREE.MeshLambertMaterial({
		color: 0x0000ff
	});
	var box = new THREE.Mesh(geometry, material);
	box.position.set(10, 0, 0)
	world.scene.add(box);
	//加入一个白光
	var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
	directionalLight.position.set(0, 1, 0);
	world.scene.add(directionalLight);
	//加入环境光
	var light = new THREE.AmbientLight(0x222222);
	world.scene.add(light);
	world.camera.lookAt(box.position);
	world.actionInjections.push(function() {
		box.rotation.x -= 0.01;
		box.rotation.y -= 0.01;
	});

	//$$.Controls.createTrackBallControls({ maxDistance: 20, minDistance: 20, enabled: true }, sceneA);
	
	return world;
}