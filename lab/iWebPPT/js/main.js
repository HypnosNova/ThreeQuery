var loadScene= createLoadingScene();
loadScene.toMain();
loadSource();

var worldArr=[];
worldArr.push(loadScene);

function loadSource() {
	$$.loadTexture([
		"img/h5ground.jpg",
		"transition/transition1.png",
		"transition/transition2.png",
		"transition/transition3.png",
		"transition/transition4.png",
		"transition/transition5.png",
		"transition/transition6.png",
		"img/ilflag.jpg",
		"img/skybox.jpg",
		"img/skydome.jpg",
		"img/rightBox.jpg",
		"img/leftBox.jpg",
		"img/box.jpg",
		"img/earthmap1k.jpg",
		"img/earthbump1k.jpg",
		"img/earthspec1k.jpg",
		"img/earthcloudmap.jpg",
		"img/earthcloudmaptrans.jpg",
		"img/intro1.jpg",
		"img/intro2.jpg",
		"img/intro3.jpg",
		"img/intro4.jpg",
		"img/intro5.jpg",
		"img/intro6.jpg",
		"img/w1.jpg",
		"img/w2.jpg",
		"img/w3.jpg",
		"img/w4.jpg",
		"img/w5.jpg",
		"img/w6.jpg",
	]);
}

$$.onLoadComplete = function() {
	var mainScene = createFlagScene();
	worldArr.push(mainScene);
	var transition = new $$.Transition(mainScene, {}, $$.global.RESOURCE.textures["transition/transition1.png"]);
	$$.actionInjections.push(transition.render);
	
}

