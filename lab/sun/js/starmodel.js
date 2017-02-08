var starModel;

function makeStarModels(){
	setLoadMessage("Forging stars")
	var model = makeSun(
		{
			radius: 7.35144e-8,
			spectral: 0.656,
		}
	);
	model.visible = false;	

	var substars = [];
	for( var i=0; i<6; i++ ){
		var submodel = makeSun(
			{
				radius: 7.35144e-8,
				spectral: 0.656,
			}
		);	
		substars.push( submodel );

		//	we won't add it to the scene yet, as we'll want to direct the draw graph ourselves here
		// model.add( submodel );

		// submodel.position.x += AUToLY(1200) * 0.001;
	}
	model.substars = substars;

	return model;
}

function hideAllSubStars(){
	var substars = starModel.substars;
	for( var i in substars ){
		substars[i].update = undefined;
		starModel.remove( substars[i] );
	}
}

function setStarModel( position, name ){
	hideAllSubStars();

	starModel.position.copy( position );

	var starSystem = starSystems[name];

	//	couldn't find the star?
	if( starSystem === undefined ){
    // console.log( name + ' not listed in systems database' );   
		starModel.setSpectralIndex( 0 );
	}

	// console.log( starSystem );

	var mainStar = starSystem.sub[0];

	//	set the main star	
	if( name === 'Sol' )
		//	for whatever reason the sun is being colored off-white into purple range
		//	this is an unfortunate hack for the time being
		starModel.setSpectralIndex(0.9);
	else
		starModel.setSpectralIndex( mainStar.c );

	starModel.setScale( mainStar.radius );
	starModel.randomizeSolarFlare();

	var rx = -0.5 + Math.random() * 2;
	var ry = -0.5 + Math.random() * 2;

	var numSubStars = starSystem.sub.length-1;
	if( numSubStars <= 0  )
		return;

	var separation = AUToLY(starSystem.sep) * 0.01;

	//	set the sub stars
	for( var i=0; i<numSubStars; i++ ){		
		var subStar = starSystem.sub[i+1];
		var subStarModelIndex = i;
		var subStarModel = starModel.substars[ subStarModelIndex ];
		
		starModel.add( subStarModel );

		subStarModel.setSpectralIndex( subStar.c );
		subStarModel.setScale( subStar.radius );
		subStarModel.randomizeSolarFlare();
		subStarModel.offset = AUToLY( subStar.offset ) * 0.0006;
		var timingOff = Math.random() * 100;
		subStarModel.angle = Math.random() * Math.PI * 2;
		subStarModel.rSpeed = Math.random() * 0.004;

		if( starSystem.sep <= 0 ){		
			subStarModel.update = function(){
				this.angle += this.rSpeed;
				this.position.x = Math.cos( this.angle ) * this.offset;
				this.position.y = Math.sin( this.angle ) * this.offset;
				this.rotation.x += this.angle * 0.0001;
				this.rotation.y += this.angle * 0.001;
			}	
		}
		else{
			var rAngle = Math.PI * 2 * Math.random();
			var dist = separation;
			subStarModel.position.x = Math.cos( rAngle ) * dist;
			subStarModel.position.y = Math.sin( rAngle ) * dist;
		}
		
	}

}

function getZoomByStarRadius( radius ){
	var delta = constrain( radius-1, 0, 10000 );
	return 1.0 + Math.sqrt(delta) * 0.12;
}

function getOffsetByStarRadius( radius ){
	var offset = new THREE.Vector3();	

	if( radius > 6 )
		camera.position.target.x = constrain(0.000000025 * radius, -0.0000001, 1000 );
	else
		camera.position.target.x = -0.00000005;

	return offset;
}