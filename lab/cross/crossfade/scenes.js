$$.subWorlds = {};
$$.subWorlds.getCurrentSubWorld=function(){
	for(var i in $$.subWorlds){
		if($$.subWorlds[i].isCurrent){
			return $$.subWorlds[i];
		}
	}
};
$$.subWorlds.getSubWorldByName=function(name){
	for(var i in $$.subWorlds){
		if($$.subWorlds[i].name==name){
			return $$.subWorlds[i];
		}
	}
};

$$.rndString=function(len) {
	if(len<=0){
		return "";
	}
	len = len - 1 || 31;　　
	var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';　　
	var maxPos = $chars.length+1;　　
	var pwd = $chars.charAt(Math.floor(Math.random() * (maxPos - 10)));
	for(i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}　　
	return pwd;
};

$$.SubWorld = function(optWorld, optCamera) {
	this.name=optWorld.name||"";
	this.id=$$.rndString(16);
	this.scene = new THREE.Scene();
	this.camera="";
	var options = $$.extends({}, [$$.global.settings.camera, optCamera]);
	if(options.type != "OrthographicCamera") {
		this.camera = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
	} else {
		this.camera = new THREE.OrthographicCamera(options.left, options.right, options.top, options.bottom, options.near, options.far);
	}
	this.actionInjections = [];
	renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: false
	};
	this.clearColor = optWorld.clearColor;
	this.fbo = new THREE.WebGLRenderTarget($$.getWorldWidth(), $$.getWorldHeight(), renderTargetParameters);
	this.isResize = optWorld.resize == null ? true : optWorld.resize;
	this.resize = function() {
		var width = $$.getWorldWidth();
		var height = $$.getWorldHeight();
		if(this.camera.type == "PerspectiveCamera") {
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
		} else {
			this.camera.left = -width / 2;
			this.camera.right = width / 2;
			this.camera.top = height / 2;
			this.camera.bottom = -height / 2;
		}
		$$.global.renderer.setSize(width, height);
		if($$.global.settings.vr && $$.global.vrEffect) {
			$$.global.vrEffect.setSize(width, height);
		}
	};
	this.update = function(rtt) {
		if(this.isResize) {
			this.resize();
		}
		for(var i = 0; i < this.actionInjections.length; i++) {
			this.actionInjections[i]();
		}
		if(rtt){
			$$.global.renderer.render(this.scene, this.camera, this.fbo, true);
		}else{
			$$.global.renderer.render(this.scene, this.camera);
		}
			
	};
	this.isCurrent=false;
	this.toMain = function() {
		$$.global.world = this.scene;
		$$.global.camera = this.camera;
		$$.actionInjections = this.actionInjections;
		$$.global.renderer.setClearColor(this.clearColor);
		$$.global.controls = this.controls;
		
		for(var i in $$.subWorlds){
			if($$.subWorlds[i].isCurrent){
				$$.subWorlds[i].isCurrent=false;
				if($$.subWorlds[i].controls){
					$$.subWorlds[i].controls.enabledBefore=$$.subWorlds[i].controls.enabled;
					$$.subWorlds[i].controls.enabled=false;
				}
			}
		}
		this.isCurrent=true;
		if(this.controls){
			this.controls.enabled=this.controls.enabledBefore;
		}
	};
	$$.subWorlds[this.id]=this;
};

$$.createSubWorld = function(optWorld, optCamera) {
	var world = new THREE.Scene();
	var camera="";
	var options = $$.extends({}, [$$.global.settings.camera, optCamera]);
	if(options.type != "OrthographicCamera") {
		camera = new THREE.PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
	} else {
		camera = new THREE.OrthographicCamera(options.left, options.right, options.top, options.bottom, options.near, options.far);
	}
	var subWorld = {
		scene: world,
		camera: camera
	};
	subWorld.actionInjections = [];
	renderTargetParameters = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		format: THREE.RGBFormat,
		stencilBuffer: false
	};
	subWorld.clearColor = optWorld.clearColor;
	subWorld.fbo = new THREE.WebGLRenderTarget($$.getWorldWidth(), $$.getWorldHeight(), renderTargetParameters);
	subWorld.update = function(rtt) {
		if($$.global.settings.resize) {
			var width = $$.getWorldWidth();
			var height = $$.getWorldHeight();
			//console.log(width+"----"+height);
			if(subWorld.camera.type == "PerspectiveCamera") {
				subWorld.camera.aspect = width / height;
				subWorld.camera.updateProjectionMatrix();
			} else {
				subWorld.camera.left = -width / 2;
				subWorld.camera.right = width / 2;
				subWorld.camera.top = height / 2;
				subWorld.camera.bottom = -height / 2;
			}
			$$.global.renderer.setSize(width, height);
		}
		$$.global.renderer.setClearColor(subWorld.clearColor);
		for(var i = 0; i < subWorld.actionInjections.length; i++) {
			subWorld.actionInjections[i]();
		}
		if(rtt)
			$$.global.renderer.render(subWorld.scene, subWorld.camera, subWorld.fbo, true);
		else
			$$.global.renderer.render(subWorld.scene, subWorld.camera);
	};
	return subWorld;
};