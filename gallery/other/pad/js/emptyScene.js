function createEmptyWorld() {
	var world = new PadWorld({
		clearColor: 0x000000,
		resize: false
	}, {});

	world.onBack = function() {
		if(pad.state == "close") {
			pad.state = "lock";
			if(!lockWorld) {
				lockWorld = createLockWorld();
			}
			pad.changeFBO(lockWorld);
			for(var i in lockWorld.dom) {
				lockWorld.dom[i].element.material.opacity = 0;
			}
			var opa = {
				a: 0
			};
			new TWEEN.Tween(opa).to({
				a: 1
			}, 500).start().onUpdate(function() {
				for(var i in lockWorld.dom) {
					lockWorld.dom[i].element.material.opacity = this.a;
				}
			});
		}
	}

	return world;
}

var tmpWorld = new $$.SubWorld({
	clearColor: 0x000000,
	resize: false
}, {
	type: "OrthographicCamera",
	near: -10,
	far: 10
});