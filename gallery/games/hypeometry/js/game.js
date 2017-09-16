var game={};
game.settings={
	blockSize:24,
	moveSpeed:300
}

function startLevel(){
	
}

var gameWorld,control;
function initMap(){
	gameWorld=core.createLevelWorld();
	gameWorld.toMain();
//	$$.Controls.createOrbitControls({},gameWorld);
//	gameWorld.camera.position.set(1000,1414,1000);
//	gameWorld.camera.lookAt(gameWorld.scene.position);
	
	$$.global.renderer.sortObjects = false;
	
	
//	control = new THREE.TransformControls( gameWorld.camera, $$.global.canvasDom );
//	control.setMode( "translate" );
//	gameWorld.scene.add( control );
	
}
