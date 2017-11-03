$$.Device = {
	getOSInfo: function() {
		var ua = navigator.userAgent,
			isWindowsPhone = /(?:Windows Phone)/.test(ua),
			isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			isAndroid = /(?:Android)/.test(ua),
			isFireFox = /(?:Firefox)/.test(ua),
			isChrome = /(?:Chrome|CriOS)/.test(ua),
			isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
			isPhone = /(?:iPhone)/.test(ua) && !isTablet,
			isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
		return {
			isTablet: isTablet,
			isIPhone: isPhone,
			isAndroid: isAndroid,
			isPc: isPc
		};
	},
	openWebcam: function(video) {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		window.URL = window.URL || window.webkitURL;
		if(navigator.getUserMedia) {
			navigator.getUserMedia({
				video: {
					optional: [{
						sourceId: exArray[1] //0为前置摄像头，1为后置  
					}]
				},
				audio: true
			}, gotStream, noStream);
		}
		var stream;

		function gotStream(s) {
			$$.global.webCamSteam = s;
			stream = s;
			if(window.URL) {
				video.src = window.URL.createObjectURL(stream);
			} else {
				video.src = stream;
			}
			camvideo.onerror = function(e) {
				stream.stop();
			};
			stream.onended = noStream;
		}

		function noStream(e) {
			var msg = 'No camera available.';
			if(e.code == 1) {
				msg = 'User denied access to use camera.';
			}
			console.log(msg)
		}
	},
	closeWebcam: function() {
		if($$.global.webCamSteam) {
			var tracks = $$.global.webCamSteam.getVideoTracks();
			for(var i = 0; i < tracks.length; i++) {
				tracks[i].stop();
			}
			tracks = $$.global.webCamSteam.getAudioTracks();
			for(var i = 0; i < tracks.length; i++) {
				tracks[i].stop();
			}
			$$.global.webCamSteam = null;
		}
	},
	toggleWebCam: function(video) {
		if($$.global.webCamSteam) {
			$$.Device.closeWebcam();
		} else {
			$$.Device.openWebcam(video);
		}
	}
};