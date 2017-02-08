// This THREEx helper makes it easy to handle window resize.
// It will update renderer and camera when window is resized.
//
// # Usage
//
// **Step 1**: Start updating renderer and camera
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Step 2**: Start updating renderer and camera
//
// ```windowResize.stop()```
// # Code

//	Some modifications by Flux

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/

var pageZoom = 1.0;
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){

		var w = window.innerWidth;
		var h = window.innerHeight;

		pageZoom = document.documentElement.clientWidth / w;

		// used for css3d placement
		screenWidth = w;
		screenHeight = h;

		var devicePixelRatio = window.devicePixelRatio || 1;

		// notify the renderer of the size change
		renderer.setSize( w * devicePixelRatio, h * devicePixelRatio );
		renderer.domElement.style.width = w + 'px';
		renderer.domElement.style.height = h + 'px';

		// update the camera
		camera.aspect	= w / h;
		camera.updateProjectionMatrix();
		initCSS3D();
	}
	// bind the resize event
	window.addEventListener('resize', callback, false);
	// return .stop() the function to stop watching window resize
	return {
		/**
		 * Stop watching window resize
		*/
		stop	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}
