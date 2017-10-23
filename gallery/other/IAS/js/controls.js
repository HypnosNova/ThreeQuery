function addControls(){
	var body=new $$.Body();
	scene.add(body);
	
	var text=new $$.Txt("关闭ObitControls",{
		width:200,
		height:30,
		fontSize:24,
		color:"#0000ff"
	});
	body.add(text);
	body.distanceFromCamera=10;
	text.position.set(3,3,0);
	text.element.scale.set(1,0.3);
	$$.actionInjections.push(body.lockToScreen);
	
	text.element.onClick=function(){
		controls.enabled=!controls.enabled;
		if(controls.enabled){
			text.text="关闭ObitControls";
		}else{
			text.text="开启ObitControls";
		}
		text.update();
	}
}

