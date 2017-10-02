var maxHeight=5,minHeight=-3000,targetHeight=5,speedRate=0.25,moveSpeed=25;
function displaywheel(e){
    var evt=window.event || e;
    var delta=evt.detail? evt.detail*(-120) : evt.wheelDelta;
    
    targetHeight=camera.position.y+speedRate*delta;
    targetHeight=Math.min(targetHeight,maxHeight);
    targetHeight=Math.max(targetHeight,minHeight);
}
 
var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
 
document.addEventListener(mousewheelevt, displaywheel, false);
$$.actionInjections.push(function(){
	if(Math.abs(camera.position.y-targetHeight)<moveSpeed){
		camera.position.y=targetHeight;
	}else{
		if(camera.position.y-targetHeight<0){
			camera.position.y+=moveSpeed;
		}else{
			camera.position.y-=moveSpeed;
		}
	}
});
$$.actionInjections.push(TWEEN.update);
