class PageWorld extends $$.SubWorld {
	constructor(sceneOpt, cameraOpt, createPage) {
		super(sceneOpt, cameraOpt);
		if(createPage) {
			createPage();
		}
	}
	initPostProcessing(passes) {
		var size = $$.global.renderer.getSize();
		var pixelRatio = $$.global.renderer.getPixelRatio();
		size.width *= pixelRatio;
		size.height *= pixelRatio;

		var composer = this.composer = new THREE.EffectComposer($$.global.renderer, new THREE.WebGLRenderTarget(size.width, size.height, {
			minFilter: THREE.LinearFilter,
			magFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			stencilBuffer: false
		}));

		var renderPass = new THREE.RenderPass(this.scene, this.camera);
		this.composer.addPass(renderPass);

		for(var i = 0; i < passes.length; i++) {
			var pass = passes[i];
			pass.renderToScreen = (i === passes.length - 1);
			this.composer.addPass(pass);
		}

		$$.global.renderer.autoClear = false;
		this.render = function() {
			$$.global.renderer.clear();
			this.composer.render();
		}.bind(this);

//		this.addResizeCallback(function() {
//			var width = window.innerWidth;
//			var height = window.innerHeight;
//
//			composer.setSize(width * pixelRatio, height * pixelRatio);
//		}.bind(this));
	}
}