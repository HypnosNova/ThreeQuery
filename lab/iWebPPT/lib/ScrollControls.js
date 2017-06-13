
function ScrollControls( camera , params ){

  this.camera     = camera;
  var params      = params || {};

  this.dampening  = params.dampening  || .5;
  this.minPos     = params.minPos     || -1000;
  this.maxPos     = params.maxPos     ||  1000; 
  this.multiplier = params.multiplier || .02;

  this.speed = 0;
  window.addEventListener( 'mousewheel', this.onMouseWheel.bind( this ), false );

}

ScrollControls.prototype.update = function(){

  this.camera.position.y += this.speed;

  if( this.camera.position.y < this.minPos ){
    var dif = this.minPos - this.camera.position.y;

    this.camera.position.y = this.minPos;
    this.speed = 0;
   
    // this.speed += this.

  }else if( this.camera.position.y > this.maxPos ){
    var dif = this.maxPos - this.camera.position.y;

    this.camera.position.y = this.maxPos;
    this.speed = 0;

  }

  this.speed *= this.dampening;

}


ScrollControls.prototype.onMouseWheel = function( e ){

  this.speed += e.wheelDeltaY * this.multiplier; 

}
