function addControls(){
	var body=new $$.Body();
	scene.add(body);
	
	var text=new $$.Txt("关闭旋转",{
		width:100,
		height:30,
		fontSize:24,
		color:"#0000ff"
	});
	body.add(text);
	body.distanceFromCamera=10;
	text.position.set(3,3,0);
	text.element.scale.set(1,0.3);
	$$.actionInjections.push(body.lockToScreen);
}

