var loadScene= createLoadingScene();
loadScene.toMain();
loadSource();

var worldArr=[];
worldArr.push(loadScene);

function loadSource() {
	$$.Loader.loadTexture([
		"transition/transition1.png",
		"transition/transition2.png",
		"transition/transition3.png",
		"transition/transition4.png",
		"transition/transition5.png",
		"transition/transition6.png",
		
	]);
}

$$.Loader.onLoadComplete = function() {
	var mainScene = createFlagScene();
	worldArr.push(mainScene);
	var transition = new $$.Transition(mainScene, {}, $$.Loader.RESOURCE.textures["transition/transition1.png"]);
	$$.actionInjections.push(transition.render);
	
}

