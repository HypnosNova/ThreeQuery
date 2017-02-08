////////////////////////////////////////
//	HELP HUD
////////////////////////////////////////

var hideHelpHudTime = 8000;		//	milliseconds
var helpHidden = false;

function hideHelp(){
	if( helpHidden )
		return;
	
	helpHidden = true;
	var help = document.getElementById('controlshelp');
  if (!help) {
    return;
  }
	help.style.display = 'none';
}

//	make the help hud automatically go away after some seconds
setTimeout( function(){
	hideHelp();
}, hideHelpHudTime );	

document.addEventListener( 'mousedown', function(){
	hideHelp();
}, true);	 
