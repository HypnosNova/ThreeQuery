var mouseX = 0, mouseY = 0, pmouseX = 0, pmouseY = 0;
var pressX = 0, pressY = 0;

var dragging = false;			
var scrollbaring = false;			

var rotateX = 0, rotateY = 0;
var rotateVX = 0, rotateVY = 0;
var rotateXMax = 90 * Math.PI/180;	

var rotateTargetX = undefined;
var rotateTargetY = undefined;

var keyboard = new THREEx.KeyboardState();	

var TOUCHMODES = {
	NONE: 0,
	SINGLE: 1,
	DOUBLE: 2,
}
var touchMode = TOUCHMODES.NONE;
var previousTouchDelta = 0;
var touchDelta = 0;

function onDocumentMouseMove( event ) {

	if( touchMode != TOUCHMODES.NONE ){
		event.preventDefault();
		return;
	}

	pmouseX = mouseX;
	pmouseY = mouseY;

	mouseX = event.clientX - window.innerWidth * 0.5;
	mouseY = event.clientY - window.innerHeight * 0.5;

	if(dragging ){
		doCameraRotationFromInteraction();
    window.setMinimap(dragging);
	}
}

function onDocumentMouseDown( event ) {	
    dragging = true;			   
    pressX = mouseX;
    pressY = mouseY;   	
    rotateTargetX = undefined;
    rotateTargetX = undefined;

    if( initialAutoRotate ){
	    initialAutoRotate = false;	 
	}
}	

function onDocumentMouseUp( event ){
	dragging = false;
	histogramPressed = false;
  // window.setMinimap(dragging);
}

function onClick( event ){
	//	make the rest not work if the event was actually a drag style click
	if( Math.abs(pressX - mouseX) > 3 || Math.abs(pressY - mouseY) > 3 )
		return;				
}

function onKeyDown( event ){	
}

function handleMWheel( delta ) {
	// camera.scale.z += delta * 0.1;
	camera.position.target.z += delta * camera.position.target.z * 0.01;
	camera.position.target.z = constrain( camera.position.target.z, 0.8, 80000 );
  	camera.position.target.pz = camera.position.target.z;
	// console.log( camera.position.z );
	
	camera.rotation.vx += (-0.0001 + Math.random() * 0.0002) * camera.position.z / 1000;
	camera.rotation.vy += (-0.0001 + Math.random() * 0.0002) * camera.position.z / 1000;

	if (window.updateMinimap) {
    	window.updateMinimap();
  	}

	if( initialAutoRotate ){
	    initialAutoRotate = false;
	}
}

function onMouseWheel( event ){
	var delta = 0;

	if (event.wheelDelta) { /* IE/Opera. */
	        delta = event.wheelDelta/120;
	} 
	//	firefox
	else if( event.detail ){
		delta = -event.detail/3;
	}

	if (delta)
	    handleMWheel(delta);

	event.returnValue = false;			
}	

function onDocumentResize(e){
	
}

function determineTouchMode( event ){
	if( event.touches.length <=0 || event.touches.length >2 ){
		touchMode = TOUCHMODES.NONE;
		return;
	}

	if( event.touches.length == 1 ){
		touchMode = TOUCHMODES.SINGLE;
		return;
	}

	if( event.touches.length == 2 ){
		touchMode = TOUCHMODES.DOUBLE;
		return;
	}	
}

function equalizeTouchTracking( event ){

	if( event.touches.length == 2 ){
		var touchA = event.touches[0];
		var touchB = event.touches[1];
		touchDelta = calculateTouchDistance( touchA, touchB );
		previousTouchDelta = touchDelta;
	}
	
	if (event.touches.length < 1 )
		return;

	var touch = event.touches[0];
	pmouseX = mouseX = touch.pageX - window.innerWidth * 0.5;
	pmouseX = mouseY = touch.pageY- window.innerHeight * 0.5;	
}

function touchStart( event ){
	onDocumentMouseDown(event);
	// console.log('touchstart');

	determineTouchMode( event );
	equalizeTouchTracking( event );
	event.preventDefault();
}

function touchEnd( event ){
	scrollbaring = false;

	onDocumentMouseUp(event);
	// console.log('touchend');
	determineTouchMode( event );
	equalizeTouchTracking( event );
	// event.preventDefault();
}

function touchMove( event ){
	if( scrollbaring ){

    var touch = event.touches[0];    
    setScrollPositionFromTouch( touch );
    event.preventDefault();
    return;
	}	

	determineTouchMode( event );

	//	single touch
	if ( touchMode == TOUCHMODES.SINGLE ) {
		pmouseX = mouseX;
		pmouseY = mouseY;

		// console.log('swiping');
		// console.log('touches: ' + event.touches.length );
		var touch = event.touches[0];

		mouseX = touch.pageX - window.innerWidth * 0.5;
		mouseY = touch.pageY- window.innerHeight * 0.5;

		// console.log( mouseX, pmouseX );
		// console.log(mouseX - pmouseX);

		if(dragging){			
			doCameraRotationFromInteraction();
	    window.setMinimap(dragging);
		}	
	}

	else if( touchMode == TOUCHMODES.DOUBLE ){
		// console.log('pinching');
		var touchA = event.touches[0];
		var touchB = event.touches[1];

		previousTouchDelta = touchDelta;
		touchDelta = calculateTouchDistance( touchA, touchB );

		var pinchAmount = touchDelta - previousTouchDelta;
		// console.log('pinch amount ' + pinchAmount );
		handleMWheel( -pinchAmount * 0.25 );		
	}



	// event.stopImmediatePropagation();
	// event.preventDefault();
}

function calculateTouchDistance( touchA, touchB ){
	var taX = touchA.pageX;
	var taY = touchA.pageY;
	var tbX = touchB.pageX;
	var tbY = touchB.pageY;
	var dist = Math.sqrt( Math.pow(tbX-taX, 2) + Math.pow(tbY-taY, 2) );
	return dist;
}

function doCameraRotationFromInteraction(){
	rotateVY += (mouseX - pmouseX) / 2 * Math.PI / 180 * 0.2;
	rotateVX += (mouseY - pmouseY) / 2 * Math.PI / 180 * 0.2;	

	camera.rotation.vy += (mouseX - pmouseX) * 0.00005 * camera.position.z / 10000;
	camera.rotation.vx += (mouseY - pmouseY) * 0.00005 * camera.position.z / 10000;	
}