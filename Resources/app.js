require('db').createDb();
//Ti.UI.orientation=Ti.UI.PORTRAIT;
Ti.API.info("In APP.Js:");

// 
var firsttime=require('db').GetFlag();
var flag=firsttime[0].FLAG;
// 
 if(flag)
 {
 	
//	service.start();
  
// create the background service
	Ti.API.info("In flag option Before creating rows in DB");
	require('ui/NewsServer').newsPannel();


}
 else{
 Ti.API.info('flag is'+flag);	
 Ti.API.info(" Else flag option After creating rows in DB");
 require('ui/beatsfromserver').BeatsFromServer();
 //require('ui/NewsServer').newsPannel(); //added by chakresh
}



//require('ui/beatsfromserver').BeatsFromServer();
//require('db').createDb();

// if(firsttime)

// else
// require('ui/userinformation').UserInformation();

//
 


