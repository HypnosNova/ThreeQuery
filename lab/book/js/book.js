class PageWorld extends $$.SubWorld {
	constructor(sceneOpt, cameraOpt,createPage) {
		super(sceneOpt, cameraOpt);
		if(createPage){
			createPage();
		}
	}
}