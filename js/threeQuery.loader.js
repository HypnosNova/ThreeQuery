$$.Loader = new(function() {
	var that = this;
	this.RESOURCE = {
		textures: {},
		models: {},
		sounds: {},
		fonts: {},
		unloadedSource: {
			textures: [],
			models: [],
			sounds: [],
			fonts: []
		}
	};
	this.loadingManager = new THREE.LoadingManager();
	this.loadingManager.onProgress = function(item, loaded, total) {
		that.onProgress(item, loaded, total);
		if(loaded == total) {
			allLoaded = true;
			if(allLoaded && soundDecodeNum == 0) {
				if(that.onLoadComplete) {
					that.onLoadComplete();
				}
			}
		}
	};
	this.onProgress = function() {};
	this.onLoadComplete = function() {};
	this.loadTexture = function(arr) {
		allLoaded = false;
		var loader = new THREE.TextureLoader(that.loadingManager);
		for(let i in arr) {
			loader.load(arr[i],
				function(texture) {
					that.RESOURCE.textures[arr[i]] = texture;
				},
				function(xhr) {},
				function(xhr) {
					that.RESOURCE.unloadedSource.textures.push(arr[i]);
					console.log(arr[i] + " is not found");
				}
			);
		}
	};
	this.loadCubeTexture = function(name, arr) {
		allLoaded = false;
		var loader = new THREE.CubeTextureLoader(that.loadingManager);
		loader.load(arr,
			function(texture) {
				that.RESOURCE.textures[name] = texture;
			},
			function(xhr) {},
			function(xhr) {
				that.RESOURCE.unloadedSource.textures.push(arr[i]);
				console.log(name + " is not found");
			}
		);
	};
	var soundDecodeNum = 0; //需要解码的音频数量
	var allLoaded = true;
	this.loadSound = function(arr) {
		var loader = new THREE.AudioLoader(that.loadingManager);
		for(let i in arr) {
			soundDecodeNum++;
			loader.load(arr[i],
				function(buffer) {
					that.RESOURCE.sounds[arr[i]] = buffer;
					soundDecodeNum--;
					if(allLoaded && soundDecodeNum == 0) {
						if($$.onLoadComplete) {
							$$.onLoadComplete();
						}
					}
				},
				function(xhr) {},
				function(xhr) {
					that.RESOURCE.unloadedSource.sounds.push(arr[i]);
					console.log(arr[i] + " is not found");
				}
			);
		}
	};
	this.loadFont = function(arr) {
		allLoaded = false;
		var loader = new THREE.FontLoader(that.loadingManager);
		var loader2 = new THREE.TTFLoader(that.loadingManager);
		for(let i in arr) {
			var str = arr[i];
			if(str.lastIndexOf(".json") == str.length - 5) {
				loader.load(arr[i],
					function(font) {
						that.RESOURCE.fonts[arr[i]] = font;
					},
					function(xhr) {},
					function(xhr) {
						that.RESOURCE.unloadedSource.textures.push(arr[i]);
						console.log(arr[i] + " is not found");
					}
				);
			} else {
				loader2.load(arr[i],
					function(json) {
						var font = new THREE.Font(json);
						that.RESOURCE.fonts[arr[i]] = font;
					},
					function(xhr) {},
					function(xhr) {
						that.RESOURCE.unloadedSource.textures.push(arr[i]);
						console.log(arr[i] + " is not found");
					}
				);
			}
		}
	};
	this.loadText = function(name, url) {
		var loader = new THREE.FileLoader(that.loadingManager);
		loader.load(
			url,
			function(data) {
				that.RESOURCE.text[name] = data;
			},
			function(xhr) {},
			function(xhr) {
				that.RESOURCE.unloadedSource.textures.push(url);
				console.log(name + " is not found");
			}
		);
	};
});