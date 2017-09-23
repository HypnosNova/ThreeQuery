function createEmptyWorld() {
	var world = new $$.SubWorld({
		clearColor: 0x000000,
		resize: false
	}, {});
	$$.actionInjections.push(function() {
		world.update(true);
	});
	return world;
}