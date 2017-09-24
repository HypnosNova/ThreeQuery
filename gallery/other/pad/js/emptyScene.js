function createEmptyWorld() {
	var world = new $$.SubWorld({
		clearColor: 0x000000,
		resize: false
	}, {});
	//	$$.actionInjections.push(world.updateFBO);
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
console.log(tmpWorld)