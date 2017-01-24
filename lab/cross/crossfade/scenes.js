$$.makeSubWorld = function(scene, camera, injections, clearColor) {
	var subWorld = {
		scene: scene,
		camera: camera,
		actionInjections: injections
	}
	renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: false
	};
	subWorld.fbo = new THREE.WebGLRenderTarget($$.getWorldWidth(), $$.getWorldHeight(), renderTargetParameters);
	subWorld.clearColor = clearColor;
	//console.log(subWorld.clearColor)
	subWorld.update = function(rtt) {
		$$.global.renderer.setClearColor(subWorld.clearColor);
		if(rtt)
			$$.global.renderer.render(subWorld.scene, subWorld.camera, subWorld.fbo, true);
		else {
			$$.global.renderer.render(subWorld.scene, subWorld.camera);
		}
	}
	return subWorld;
}

$$.createSubWorld = function(optWorld, optCamera) {
	var world = new THREE.Scene();
	var camera;
	var options = $$.extends({}, [$$.global.settings.camera, optCamera]);
	if(options.type != "OrthographicCamera") {
		camera = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
	} else {
		camera = new THREE.OrthographicCamera(options.left, options.right, options.top, options.bottom, options.near, options.far);
	}
	var subWorld = {
		scene: world,
		camera: camera
	}
	subWorld.actionInjections = [];
	renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: false
	};
	subWorld.clearColor = optWorld.clearColor;
	subWorld.fbo = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, renderTargetParameters);
	subWorld.update = function(rtt) {
		$$.global.renderer.setClearColor(subWorld.clearColor);
		for(var i = 0; i < subWorld.actionInjections.length; i++) {
			subWorld.actionInjections[i]();
		}
		if(rtt)
			$$.global.renderer.render(subWorld.scene, subWorld.camera, subWorld.fbo, true);
		else
			$$.global.renderer.render(subWorld.scene, subWorld.camera);
	}
	return subWorld;
}