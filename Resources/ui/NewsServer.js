exports.newsPannel=function(e)
{
	
	
	//this code is for getting current location after each interval function call after few secode to update location 
	var Category=[];
	var dataForCategory=[];
	var tableViewForInfluencers = null;
	
var tableDataAnuragEvents = [];
var tableDataPress = [];
var tableDataAnuragNews = [];
	var tableDataInfluencer = [];
	var LoadMoreCount=0;
	var LoadMoreCountForEven=0;
	var placedear;
	var longitude;
var latitude;
//var win=Ti.UI.createWindow();


var MyEventButton=Ti.UI.createButton({
	width:Ti.UI.FILL,
	height:'35',
	title:'MyEvents',
	top:'45',
	backgroundColor:'white',
	color:'#000'
	
});


Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (!e.success || e.error)
    {
        alert('error ' + JSON.stringify(e.error));
        return;
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
    
});
 
 

var locationCallback = function(e)
{
	MyEventButton.setTitle(' click here Location Based events....');
    if (!e.success || e.error)
    {
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
 
    //setTimeout(function()
   // {
 
   // },10000);
 
    //reverse geo
    Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt)
    {
        if (evt.success) {
            var places = evt.places;
            if (places && places.length) {
                //reverseGeo.text = places[0].address;
                var place = places[0].address;
        placedear=place;
      //  MyEventButton.setTitle(placedear);
                Ti.API.info('You are in ='+place);
              //  alert("Current location "+place);
            } else {
                //reverseGeo.text = "No address found";
              //  alert("No address found");
            }
            //Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
        }
        else {              
        }
    });
 
};
	
	
	Titanium.Geolocation.addEventListener('location', locationCallback);

MyEventButton.addEventListener('click',function(){
	
	//alert('My Event Button is clicked');
		
		 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'EventLocationBased.js',
        lat:latitude,
        longi:longitude,
        place:placedear
    });

    wndNewWindow.open();

	
});
	
	
	
	
	
	
	
//....................location code end.................	


//.....................window payload....

//var win=Ti.UI.currentWindow;
//drawer.addEventListener('postlayout',function(e){
	// if(buttonHeight != win.rect.height-45)
	// {
	// buttonHeight=win.rect.height-45;	
	// buttonSaveBeatsRequest.top = buttonHeight;
	// }
		// if(table_height != win.rect.height-115)
		// {
		 // table_height=win.rect.height-115;	
		 // TheTable.height=table_height;	
		// }
// 	
	 
	//alert('height'+buttonHeight);
	
	//Ti.API.info('width of window is =*************************'+drawer.rect.width);
	
//});	




var progressIndicator = Ti.UI.Android.createProgressIndicator({
  message: 'Loading...',
  location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
  type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
  cancelable: false,
  
});

progressIndicator.show();
var leftMenuView = Ti.UI.createView({
	backgroundColor:'#3d3d3d',
	width: Ti.UI.FILL,
	height: Ti.UI.FILL
});

require('db').createDb();

var NewsView = Ti.UI.createView({
	backgroundColor:'white',
	width: Ti.UI.FILL,
	bottom :45
	

	//height: Ti.UI.FILL
});

var EventsView=Ti.UI.createView({
backgroundColor:'white',
	//width: Ti.UI.FILL,
	//bottom :45,
	//height: Ti.UI.FILL,
	//backgroundImage:'load.gif'
});

var PressReleaseView=Ti.UI.createView({
backgroundColor:'white',
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
	//backgroundImage:'load.gif'
});
var influenCersview=Ti.UI.createView({
	//backgroundImage:'load.gif',
	backgroundColor:'white',
	width: Ti.UI.FILL,
	height: Ti.UI.FILL
});
// var rightMenuView = Ti.UI.createView({
	// backgroundColor:'#ddd',
	// width: Ti.UI.FILL,
	// height: Ti.UI.FILL
// });


// create a menu

//.....................
var TheTable = Titanium.UI.createTableView({top:160,height:300});


var beatUrl='';

var data=[];
var row = Titanium.UI.createTableViewRow();

	var countrys = Titanium.UI.createImageView({
		image:'appicon.png',
		textAlign:'left',
		top:10,
		left:5,
		width : 50,
		height : 50
		
	});
	//row.add(countrys);
    //data.push(row);


leftMenuView.add(countrys);
var row = Titanium.UI.createTableViewRow();

	var countrys = Titanium.UI.createLabel({
		text:'Latest',
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:60,
		left:5,
		color:'white',
		height:20
	});
	countrys.addEventListener('click',function(e){


	tableDataAnuragEvents = [];
	 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'latest.js',
    });

    wndNewWindow.open();
drawer.toggleLeftWindow();

					
	});
	//row.add(countrys);
//data.push(row);
leftMenuView.add(countrys);
	var row = Titanium.UI.createTableViewRow();
		var countryss = Titanium.UI.createLabel({
		text:'About Us',
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		bottom:20,
		left:5,
		height:20,color:'white'
	});
countryss.addEventListener('click',function(e){
	
	tableDataAnuragEvents = [];
	 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'about.js',
        
    });

    wndNewWindow.open();
drawer.toggleLeftWindow();
});
		//require('about').aboutData();
			// var intent = Ti.Android.createIntent({
    // // action: Ti.Android.ACTION_MAIN,
    // url: 'about.js'
// });
// intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
// Ti.Android.currentActivity.startActivity(intent);
//Ti.API.info('width window=*******'+drawer.centerWindow.rect.width);
		
//		var intent = Ti.Android.createIntent({
    
//    url: 'about.js'
//});

//intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
//Ti.Android.currentActivity.startActivity(intent);
		
//		drawer.toggleLeftWindow();
	
//});
//row.add(countryss);
//data.push(row);
leftMenuView.add(countryss);

	var row = Titanium.UI.createTableViewRow();
	
		var countrymyevent = Titanium.UI.createLabel({
		text:'My Event',
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:100,
		left:5,
		//bottom :45,
		height:20,
		color:'white'
		
	});
countrymyevent.addEventListener('click',function(e){
	tableDataAnuragEvents = [];
	 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'EventLocationBased.js',
        lat:latitude,
        longi:longitude,
        place:placedear
    });

    wndNewWindow.open();
drawer.toggleLeftWindow();
});
leftMenuView.add(countrymyevent);
//row.add(countrymyevent);
//data.push(row);


var countryLatestNews = Titanium.UI.createLabel({
		text:'Latest News',
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:130,
		left:5,
		height:20,color:'white'
		
	});
countryLatestNews.addEventListener('click',function(e){
	tableDataAnuragEvents = [];
	 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'latest.js',
        
    });

    wndNewWindow.open();
drawer.toggleLeftWindow();
});
//leftMenuView.add(countryLatestNews);




var row = Titanium.UI.createTableViewRow();
		var TextBeatICover = Titanium.UI.createLabel({
		text:'Beat I Cover',
		font:{fontSize:16},
		width:'auto',
		textAlign:'left',
		top:140,
		left:5,
		height:20,
		color:'white'
	});
	
leftMenuView.add(TextBeatICover);

//row.add(countrysss);
//data.push(row);
  var BeatsList=require('db').selectBeats();
		


for (var i = 0;i<BeatsList.length; i++){

	var row = Titanium.UI.createTableViewRow();


	var country = Titanium.UI.createLabel({
		text:BeatsList[i].beat_name,
		
		width:'auto',
		textAlign:'left',
		top:30,
		left:80,
		height:23,
		font:{fontFamily:'Italic',fontSize:16},
		color:'#DCDCDC'
	});
	
	
	var checkStatus;
if(BeatsList[i].status){
	checkStatus=true;
	var termids=BeatsList[i].termid;
	Ti.API.info('beatUrls='+termids);
beatUrl=beatUrl+termids.toString()+'+';
}
else
{
	checkStatus=false;
}

var basicSwitchs = Ti.UI.createSwitch({
  style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
  textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
  title:'',
  value:checkStatus,
 left:45,
  width: 300 ,top:30,id:BeatsList[i].id,
  color:'white',
  tintColor:'white'
 // necessary for textAlign to be effective
 
});
basicSwitchs.addEventListener('change',function(e){
 // alert('Switch value: ' + e.value+'=id'+e.source.id);
 var ischecked;
 if(e.value==true){
 	ischeckeds=1;
 }
 else{
 	ischeckeds=0;
 	
 }
 
 require('db').updateCheckStatus({id:e.source.id,status:ischeckeds});
});


	row.add(country);
	row.add(basicSwitchs);
	

	data.push(row);
};


TheTable.setData(data);

leftMenuView.add(TheTable);
TheTable.addEventListener("click", function(e)
{
	
	Ti.API.info("isAnyWindowOpen: " + drawer.isAnyWindowOpen());
	switch(e.index){
		case 0:
			drawer.toggleLeftWindow(); //animate back to center
			//require('db').addItem({beatname:'UncheckedBeatBhai',termId:62,status:0});

			//alert("You clicked " + e.rowData.title + ". Implement menu structure.. ");
			break;
		case 1:
		var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();


require('news').mybeats(urlnews,anurag, errorHandler);
			drawer.setCenterWindow(NewsView);
			drawer.toggleLeftWindow();
			 //animate back to center
	
			 //animate back to center



			break;
		case 2:
		
		break;
	case 3:
	
		 var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : 'EventLocationBased.js',
        lat:latitude,
        longi:longitude,
        place:placedear
    });

    wndNewWindow.open();
drawer.toggleLeftWindow();
	//alert('MyEvents is clicked....');
	break;
			
	} 
});

//.........................................above no need for change
// Action Bar - FAKE example
var actionBar = Ti.UI.createView({
	top:0,
	height:"44dp",
	backgroundColor:"#474546"
});

var NappDrawerModule = require('dk.napp.drawer');
var drawer = NappDrawerModule.createDrawer({
	
	fullscreen:false, 
	leftWindow: leftMenuView,
	centerWindow: NewsView,
	//rightWindow: rightMenuView,
	fading: 0.2, // 0-1
	parallaxAmount: 0.2, //0-1
	shadowWidth:"40dp", 
	leftDrawerWidth: "240dp",
	rightDrawerWidth: "200dp",
	animationMode: NappDrawerModule.ANIMATION_NONE,
	closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_MARGIN,
	openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
	orientationModes: [Ti.UI.PORTRAIT, Ti.UI.PORTRAIT],


});

drawer.addEventListener("didChangeOffset", function(e){
	//Ti.API.info("didChangeOffset: " + e.offset);
});

drawer.addEventListener("windowDidOpen", function(e){
	if(e.window == NappDrawerModule.LEFT_WINDOW) {
		Ti.API.info("windowDidOpen - LEFT DRAWER");
	} else if (e.window == NappDrawerModule.RIGHT_WINDOW) {
		Ti.API.info("windowDidOpen - RIGHT DRAWER");
	
	}
	else if(e.window==NappDrawerModule.CENTER_WINDOW)
	{
		alert('inside Center window');
		
	}
});
drawer.addEventListener("windowDidClose", function(e){
	Ti.API.info("windowDidClose");
});


// Action Bar - REAL example
drawer.addEventListener('open', onNavDrawerWinOpen);
function onNavDrawerWinOpen(evt) {
    this.removeEventListener('open', onNavDrawerWinOpen);

    if(this.getActivity()) {
        // need to explicitly use getXYZ methods
        var actionBar = this.getActivity().getActionBar();

        if (actionBar) {
            // Now we can do stuff to the actionbar  
            actionBar.setTitle('Click this logo for full menu.');
            
            // show an angle bracket next to the home icon,
            // indicating to users that the home icon is tappable
            actionBar.setDisplayHomeAsUp(true);
	
			
            // toggle the left window when the home icon is selected
            actionBar.setOnHomeIconItemSelected(function() {
                drawer.toggleLeftWindow();
           });
        }
    }  
    
   }







var event_left=drawer.centerWindow.rect.width/3;
var influencer_left = drawer.centerWindow.rect.width/2;	

var leftToolbarBtn = Ti.UI.createLabel({
	left: "20dp",
	text:'News',
	font:{fontSize:18},
	width:'48',height:'48'
	
});
leftToolbarBtn.addEventListener('click',function(){
	jsonInfluencerObject=[];
	tableDataAnuragNews = [];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
require('news').mybeats(urlnews,anurag, errorHandler);
	
	
			drawer.setCenterWindow(NewsView);
			//drawer.toggleLeftWindow(); //animate back to center
	
});
var rightToolbarBtn = Ti.UI.createLabel({
	//right:"3dp",
left:influencer_left,
	text:'Press Release',
	right : '10',textAlign : 'right',
	width:'135',height:'48',
		font:{fontSize:18},

	
});
rightToolbarBtn.addEventListener("click", function(){
	//drawer.toggleLeftWindow();
progressIndicator.show();
tableDataPress = [];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/release&termid="+beatUrlss;
	jsonInfluencerObject=[];
	require('news').mybeats(urlnews,PressReleaseanurag, errorHandler);
	drawer.setCenterWindow(PressReleaseView);


//	drawer.setCenterWindow(Ti.UI.createView({backgroundColor:"red"}));
});

/*var fourthToolbarBtn = Ti.UI.createLabel({
right:'10dp',
		font:{fontSize:17},

	text:'Influencers',	width:'82',height:'48'
});
fourthToolbarBtn.addEventListener("click", function(){
	//drawer.toggleRightWindow();
	//influenCersview.add(actionBar);
	progressIndicator.show();
 tableDataInfluencer = [];
jsonInfluencerObject=[];
 var rd = []; 
 if(tableViewForInfluencers!=null)
 tableViewForInfluencers.data = rd;
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/influers&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
require('news').mybeats(urlnews,InfluncerViewDataFetch, errorHandler);
	
	drawer.setCenterWindow(influenCersview);
	//alert('inluercers clicked');
});
*/
var centerLabel = Ti.UI.createLabel({
	left:event_left,
	text:'Events',	width:'95',height:'48'
		,font:{fontSize:18}

});
centerLabel.addEventListener('click',function(e){
	//EventsView.add(actionBar);
	progressIndicator.show();
	//Titanium.Geolocation.addEventListener('location', locationCallback);
	tableDataAnuragEvents = [];
		jsonInfluencerObject=[];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,EventsDataFetchingFunction, errorHandler);

	drawer.setCenterWindow(EventsView);
	//alert('events is clicked');
});
actionBar.add(leftToolbarBtn);
actionBar.add(rightToolbarBtn);
actionBar.add(centerLabel);
//actionBar.add(fourthToolbarBtn);
NewsView.add(actionBar);

//................................................

var actionBar2 = Ti.UI.createView({
	top:0,
	height:"44dp",
	backgroundColor:"#474546"
});


var leftToolbarBtn2 = Ti.UI.createLabel({
	left: "20dp",
	text:'News',
		font:{fontSize:18},

	width:'48',height:'48'
	
});
leftToolbarBtn2.addEventListener('click',function(){
		var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
jsonInfluencerObject=[];
	tableDataAnuragNews = [];
require('news').mybeats(urlnews,anurag, errorHandler);
			drawer.setCenterWindow(NewsView);
			//drawer.toggleLeftWindow(); //animate back to center
	
});
var event_left2=drawer.centerWindow.rect.width/3;
var influencer_left2 = drawer.centerWindow.rect.width/2;	

var rightToolbarBtn2 = Ti.UI.createLabel({
	//right:"3dp",
	left:influencer_left2,
	text:'Press Release',	width:'135',height:'48',right : '10', textAlign : 'right'
		,font:{fontSize:18}

});
rightToolbarBtn2.addEventListener("click", function(){
	//drawer.toggleLeftWindow();
progressIndicator.show();
jsonInfluencerObject=[];
tableDataPress = [];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/release&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,PressReleaseanurag, errorHandler);
	drawer.setCenterWindow(PressReleaseView);

//	drawer.setCenterWindow(Ti.UI.createView({backgroundColor:"red"}));
});




/*
var fourthToolbarBtn2 = Ti.UI.createLabel({
right:'10dp',
	//left:influencer_left2,
	text:'Influencers',	width:'82',height:'48'
		,font:{fontSize:17}
});
fourthToolbarBtn2.addEventListener("click", function(){
	//drawer.toggleRightWindow();
	//influenCersview.add(actionBar);
	progressIndicator.show();
	var rd = []; 
	if(tableViewForInfluencers!=null)
	tableViewForInfluencers.data = rd;
	 tableDataInfluencer = [];
	 jsonInfluencerObject=[];
	 
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/influers&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
require('news').mybeats(urlnews,InfluncerViewDataFetch, errorHandler);
	
	drawer.setCenterWindow(influenCersview);
	//alert('inluercers clicked');
});

*/


var centerLabel2 = Ti.UI.createLabel({
	left:event_left2,	font:{fontSize:18},

	text:'Events',	width:'95',height:'48'
});
centerLabel2.addEventListener('click',function(e){
	//EventsView.add(actionBar);
	progressIndicator.show();
	jsonInfluencerObject=[];
	tableDataAnuragEvents = [];
	Titanium.Geolocation.addEventListener('location', locationCallback);
		

	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,EventsDataFetchingFunction, errorHandler);
	drawer.setCenterWindow(EventsView);
	
	
	
	//alert('events is clicked');
});
actionBar2.add(leftToolbarBtn2);
actionBar2.add(rightToolbarBtn2);
actionBar2.add(centerLabel2);
//actionBar2.add(fourthToolbarBtn2);

EventsView.add(actionBar2);

//.....................PressRelease start action..........................................


var actionBarPressRelease = Ti.UI.createView({
	top:0,
	height:"44dp",
	backgroundColor:"#474546"
});


var leftToolbarBtnPressRelease = Ti.UI.createLabel({
	left: "20dp",
	text:'News',	
	font:{fontSize:18},

	width:'48',height:'48'
	
});
leftToolbarBtnPressRelease.addEventListener('click',function(){
		var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
	tableDataAnuragNews = [];
jsonInfluencerObject=[];
require('news').mybeats(urlnews,anurag, errorHandler);
			drawer.setCenterWindow(NewsView);
			//drawer.toggleLeftWindow(); //animate back to center
	
});
var event_left3=drawer.centerWindow.rect.width/3;
var influencer_left3 = drawer.centerWindow.rect.width/2;	

var rightToolbarBtnPressRelease = Ti.UI.createLabel({
//	right:"3dp",
	left:influencer_left3,	font:{fontSize:18},
	right : 10,textAlign:'right',
	text:'Press Release',	width:'135',height:'48', textAlign : 'right'
	
});
rightToolbarBtnPressRelease.addEventListener("click", function(){
	//drawer.toggleLeftWindow();
progressIndicator.show();
tableDataPress = [];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/release&termid="+beatUrlss;
	jsonInfluencerObject=[];
	require('news').mybeats(urlnews,PressReleaseanurag, errorHandler);
	drawer.setCenterWindow(PressReleaseView);
	
	//drawer.setCenterWindow(Ti.UI.createView({backgroundColor:"red"}));
});



/*

var fourthToolbarBtnPressRelease = Ti.UI.createLabel({
right:'10dp',
	//left:influencer_left3,
	text:'Influencers',	width:'82',height:'48'
		,font:{fontSize:17}

});
fourthToolbarBtnPressRelease.addEventListener("click", function(){
	//drawer.toggleRightWindow();
	//influenCersview.add(actionBar);
	 tableDataInfluencer = [];
	 jsonInfluencerObject=[];
	 
	 var rd = []; 
	 if(tableViewForInfluencers!=null)
	 tableViewForInfluencers.data = rd;
	progressIndicator.show();
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/influers&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
require('news').mybeats(urlnews,InfluncerViewDataFetch, errorHandler);
	
	drawer.setCenterWindow(influenCersview);
	//alert('inluercers clicked');
});
*/
var centerLabelPressRelease = Ti.UI.createLabel({
	left:event_left,
	text:'Events',	width:'95',height:'48',
		font:{fontSize:18},

  
});
centerLabelPressRelease.addEventListener('click',function(e){
	//EventsView.add(actionBar);
	progressIndicator.show();
	jsonInfluencerObject=[];
	tableDataAnuragEvents = [];
	//Titanium.Geolocation.addEventListener('location', locationCallback);
		
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,EventsDataFetchingFunction, errorHandler);
	drawer.setCenterWindow(EventsView);
	
	//alert('events is clicked');
});
actionBarPressRelease.add(leftToolbarBtnPressRelease);
actionBarPressRelease.add(rightToolbarBtnPressRelease);
actionBarPressRelease.add(centerLabelPressRelease);
//actionBarPressRelease.add(fourthToolbarBtnPressRelease);

PressReleaseView.add(actionBarPressRelease);

//...............................................................




//...............................................................
var actionBarinfluenCers = Ti.UI.createView({
	top:0,
	height:"44dp",
	backgroundColor:"#474546"
});

var event_left4=drawer.centerWindow.rect.width/3;
var influencer_left4 = drawer.centerWindow.rect.width/2;	

var leftToolbarBtninfluenCers = Ti.UI.createLabel({
	left: "20dp",
	text:'News',	width:'48',height:'48'
	,font:{fontSize:18}

	
});
leftToolbarBtninfluenCers.addEventListener('click',function(){
	
	
		var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
	tableDataAnuragNews = [];
jsonInfluencerObject=[];
require('news').mybeats(urlnews,anurag, errorHandler);
			drawer.setCenterWindow(NewsView);
			//drawer.toggleLeftWindow(); //animate back to center
	
});
var rightToolbarBtninfluenCers = Ti.UI.createLabel({
//	right:"3dp",
		left:influencer_left4,	font:{fontSize:18},
	right : '10',textAlign : 'right',
	text:'Press Release',	width:'135',height:'48', textAlign : 'right'

});
rightToolbarBtninfluenCers.addEventListener("click", function(){
	//drawer.toggleLeftWindow();
progressIndicator.show();
jsonInfluencerObject=[];
tableDataPress = [];
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/release&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,PressReleaseanurag, errorHandler);
	drawer.setCenterWindow(PressReleaseView);


	//drawer.setCenterWindow(Ti.UI.createView({backgroundColor:"red"}));
});

/*
var fourthToolbarBtninfluenCers = Ti.UI.createLabel({
right:'10dp',
font:{fontSize:defaultFontSize+2},
	text:'Influencers',	font:{fontSize:17},

		width:'82',height:'48'
});
fourthToolbarBtninfluenCers.addEventListener("click", function(){
	//drawer.toggleRightWindow();
	//influenCersview.add(actionBar);
	progressIndicator.show();
	 tableDataInfluencer = [];
	 jsonInfluencerObject=[];
	 var rd = []; 
	 if(tableViewForInfluencers!=null)
	 tableViewForInfluencers.data = rd;
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/influers&termid="+beatUrlss;
Ti.API.info('urlnewsFinal='+urlnews);
require('news').mybeats(urlnews,InfluncerViewDataFetch, errorHandler);
			
	drawer.setCenterWindow(influenCersview);
	//alert('inluercers clicked');
});
*/
var centerLabelinfluenCers = Ti.UI.createLabel({
	left:event_left,	font:{fontSize:18},

	text:'Events',	width:'95',height:'48'
});
centerLabelinfluenCers.addEventListener('click',function(e){
	//EventsView.add(actionBar);
	progressIndicator.show();
	jsonInfluencerObject=[];
	tableDataAnuragEvents = [];
	//Titanium.Geolocation.addEventListener('location', locationCallback);
		
	
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss;
	
	require('news').mybeats(urlnews,EventsDataFetchingFunction, errorHandler);
	drawer.setCenterWindow(EventsView);
	//alert('events is clicked');
});
actionBarinfluenCers.add(leftToolbarBtninfluenCers);
actionBarinfluenCers.add(rightToolbarBtninfluenCers);
actionBarinfluenCers.add(centerLabelinfluenCers);
//actionBarinfluenCers.add(fourthToolbarBtninfluenCers);

influenCersview.add(actionBarinfluenCers);



//.....................................actionBar code end...
// create interface


//.......................
// CREATE THE MODULE

//..............................
// lets open it

errorHandler = function(err) 
 {
 	progressIndicator.hide();
 	alert("Please Check Your DATA Connnection");
 };


var IMG_BASE = 'https://github.com/appcelerator/titanium_mobile/raw/master/demos/KitchenSink/Resources/images/';
var defaultFontSize = Ti.Platform.name === 'android' ? 16 : 14;
//progress indicator..........



//................................influcer Fetching Code is here...

var LoadMoreButtonForInfluencer=Ti.UI.createButton({
	width:Ti.UI.FILL,
	height:'45',
	title:'Load More',
	backgroundColor:'#474546',
	color:'#fff',
	bottom:0
	
});

var win=drawer.centerWindow;
var LandHeightForInfluencer=win.rect.height-50;
// var tableViewForInfluencers = Ti.UI.createTableView({
   // backgroundColor:'white',
  // top:70,
  // height:LandHeightForInfluencer,
  // separatorColor:'#DEDEDE',
// });

//var tableDataInfluencer = [];
var jsonInfluencerObject = [];


var rowCreate=function(response){
if(tableViewForInfluencers  == null)
tableViewForInfluencers = Ti.UI.createTableView({
   backgroundColor:'white',
  top:70,
  height:LandHeightForInfluencer,
  separatorColor:'#DEDEDE',
});
var iLen=response.length;
     for ( var i = 0; i < iLen; i++)
	 {
	 	var nid=response[i].nid;
var imgurl=response[i].pic.match(/src\=([^\s]*)\s/)[1];
imgurl=imgurl.replace(/"/g, "");
//var imgurl=response[i].pic;
Ti.API.info('Events Fetching');
Ti.API.info('imgurl='+imgurl);
Ti.API.info('imgurl='+nid);
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'#fff',
    rowIndex:i, // custom property, useful for determining the row during events
    height:85,
    url:'InfluencerDetail.js',
    name:'anurag'+i,
   image:imgurl,
   nid:response[i].nid
  });
  row.removeAllChildren();
  
  var imageAvatar = Ti.UI.createImageView({
    image:imgurl,
    left:10, top:5,
    width:50, height:60
  });
  row.add(imageAvatar);
  
  var labelUserName = Ti.UI.createLabel({
   // color:'#576996',
    //font:{fontFamily:'Arial', fontSize:defaultFontSize+3, fontWeight:'bold'},
    
    font:{fontFamily:'Roboto', fontSize:defaultFontSize+2},
    color:'#3d3d3d',
    
    text:response[i].node_title,
    left:70, top: 6,
    width:200, height: 25
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    color:'#858585',
    font:{fontFamily:'Arial', fontSize:defaultFontSize,},
    text:response[i].about,
    left:70, top:34,
    width:360
  });
  row.add(labelDetails);
  
  var imageCalendar = Ti.UI.createLabel({
  //  image:IMG_BASE + 'custom_tableview/eventsButton.png',
  color:'#999',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    
    right:2, bottom: 2,
    width:100, height: 32,
    text:require('news').mybeats(response[i].dataForCategory[i]),
  });
  // if(dataForCategory.indexOf(response[i].category[0]) == -1)
  // {
  	// dataForCategory[i]=Ti.UI.createPickerRow({title:response[i].category[0],color:'#756789'});
  // }
if(Category.indexOf(response[i].category[0]) == -1)
{
	Category.push(response[i].category[0]);
}


  row.add(imageCalendar);
  
  // var labelDate = Ti.UI.createLabel({
    // color:'#999',
    // font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    // text:response[i].category[0],
    // right:5, 
    // width:200, height:20
  // });
  // row.add(labelDate);
 
  tableDataInfluencer.push(row);
}
tableViewForInfluencers.setData(tableDataInfluencer);


	
};
var InfluencerDataForCategoryAll=[];
//click handler//
function CategoryChangeHandlerForInfluencers(categoryName)
{
	if(categoryName == "All")
	{
		rowCreate(InfluencerDataForCategoryAll);
	}
	else
	{
		var arrayFilteredInfluencers=[];
		for(var i = 0; i < jsonInfluencerObject.length; i++)
		{
			if(jsonInfluencerObject[i].category == categoryName)
			{
				arrayFilteredInfluencers.push(jsonInfluencerObject[i]);
				
			}
		}		
		rowCreate(arrayFilteredInfluencers);
		
	}
	
}

function InfluencerAppendToJson(response){
	
	
var iLen=response.length;
     for ( var i = 0; i < iLen; i++)
	jsonInfluencerObject.push(response[i]);
	
}



InfluncerViewDataFetch=function(response){

if(response == null)
	{
	   Ti.API.info('No news found');
	   drawer.open();
	   return;
	}
	InfluencerDataForCategoryAll=response;
	InfluencerAppendToJson(response);
	
rowCreate(jsonInfluencerObject);

tableViewForInfluencers.addEventListener('click', function(e){
	
    var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : e.rowData.url,
        name:e.rowData.name,
        image:e.rowData.image,
        nid:e.rowData.nid
    });

    wndNewWindow.open();
});
var picker = Ti.UI.createPicker({
  top:42,
  right:'0dp',
  width:'120dp',
  backgroundColor:'#474546',
 
});

var j=Category.length;
for (var i=0; i < Category.length; i++) 
{
dataForCategory[i]=Ti.UI.createPickerRow({title:Category[i],color:'#756789'});  

};
dataForCategory[j]=Ti.UI.createPickerRow({title:'All',color:'#756789'});


picker.add(dataForCategory);

picker.selectionIndicator = true;
picker.addEventListener('change',function(e){
  Ti.API.info("User selected Category " +picker.getSelectedRow(0).title);
  tableDataInfluencer=[];
CategoryChangeHandlerForInfluencers(picker.getSelectedRow(0).title);
});
influenCersview.add(picker);
influenCersview.add(tableViewForInfluencers);

//influenCersview.add(LoadMoreButtonForInfluencer);
progressIndicator.hide();
drawer.open();

};




//.............................Events Fetching Code is Here
var LoadMoreButtonEvent=Ti.UI.createButton({
	width:Ti.UI.FILL,
	height:'45',
	title:'Load More',
	backgroundColor:'#474546',
	color:'#fff',
	bottom:0
	
});
	var win=drawer.centerWindow;
var LandHeights=win.rect.height-100;
var tableViewForEvents=null;
EventsDataFetchingFunction=function(response){
//var tableData = [];
if(response == null)
	{
	   Ti.API.info('No news found');
	   progressIndicator.hide();
	   drawer.open();
	   return;
	}
var iLen=response.length;
		Titanium.API.info('event count before='+LoadMoreCountForEven);
	if(LoadMoreCountForEven ==5){
		LoadMoreButton.setTitle('Load More');
		Titanium.API.info('anurag count='+LoadMoreCountForEven);
		progressIndicator.hide();
		return;
	}

 tableViewForEvents = Ti.UI.createTableView({
  backgroundColor:'white',
  top:70,
  bottom:45,
  left:2,
  right:2,
  //eventsview windows setup 
  //height:Ti.UI.FILL,
  separatorColor:'#DEDEDE',
});
     	for ( var i = 0; i < iLen; i++)
	 {
	 	var nid=response[i].nid;
var imgurl=response[i].pic.match(/src\=([^\s]*)\s/)[1];
imgurl=imgurl.replace(/"/g, "");
//var imgurl=response[i].pic;
Ti.API.info('Events Fetching');
Ti.API.info('imgurl='+imgurl);
Ti.API.info('nid='+nid);
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'white',
    rowIndex:i, // custom property, useful for determining the row during events
    height:80,
  //  right:5,
    url:'EventsDetail.js',
    name:'anurag'+i,
   image:imgurl,
   nid:response[i].nid
  });
  
  var imageAvatar = Ti.UI.createImageView({
    image:imgurl,
    left:10, top:5,
    width:50, height:50
  });
  row.add(imageAvatar);
  
  
  var node_title = response[i].node_title.substring(0, 25); 
  node_title += " ...";
  var labelUserName = Ti.UI.createLabel({
    //color:'#576996',
    //font:{fontFamily:'Arial', fontSize:defaultFontSize+3, fontWeight:'bold'},
    
    font:{fontFamily:'Roboto', fontSize:defaultFontSize+2},
    color:'#3d3d3d',
    
    text:node_title,
    left:70, top: 6,
    width:200, height: 25
  });
  row.add(labelUserName);
  
  var node_details = response[i].location.substring(0, 25); 
  node_details += " ...";
  
  var labelDetails = Ti.UI.createLabel({
    color:'#858585',
    font:{fontFamily:'Arial', fontSize:defaultFontSize},
    text:node_details,
    left:70, top:34,
    width:360
  });
  row.add(labelDetails);
  
  var imageCalendar = Ti.UI.createImageView({
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    right:5, bottom: 2,
    width:32, height: 32
  });
  //row.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#999',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
    text:response[i].startdate,

    right:5, 
    width:300, height:20,bottom:0
  });
 // row.add(labelDate);
  
  tableDataAnuragEvents.push(row);
}

tableViewForEvents.setData(tableDataAnuragEvents);

tableViewForEvents.addEventListener('click', function(e){
    var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : e.rowData.url,
        name:e.rowData.name,
        image:e.rowData.image,
        nid:e.rowData.nid
    });

    wndNewWindow.open();
});
EventsView.add(tableViewForEvents);
LoadMoreButtonEvent.addEventListener('click',function(e){
	
if(	LoadMoreCountForEven!=5){
	
	Ti.API.info('*****************Here I come inside if*****************');
	LoadMoreCountForEven=LoadMoreCountForEven+1;
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss+'&page='+LoadMoreCountForEven;
    //Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
{require('news').mybeats(urlnews,EventsDataFetchingFunction, errorHandler);
			drawer.setCenterWindow(EventsView);}
	Ti.API.info('LoadMore Count='+LoadMoreCount);
	}
	else{
		Ti.API.info('else Count='+LoadMoreCount);
		//NewsView.remove(LoadMoreButton);
		LoadMoreButtonEvent.hide();
	}
	


	
	
});

if(LoadMoreCountForEven == 0)
	EventsView.add(LoadMoreButtonEvent);
//EventsView.add(MyEventButton);
drawer.open();
progressIndicator.hide();
};

//.....................Press Release Fetching..........................

myalert = function (fileName, f,ext)
{
	alert("File " + fileName + "is downloaded");
	
	//var f = Ti.Filesystem.getFile(nativePath,fileName);
	
	//var ff=Ti.Filesystem.externalStorageDirectory+e.rowData.fileName;
	Ti.API.info("f in myalert "+ f.nativePath);
	Ti.API.info("Extantion="+ext);
	//Ti.API.info("ff="+ff);
	
 if (f) {
 	
        var intent = Ti.Android.createIntent({
            action: Ti.Android.ACTION_VIEW,
            data: f.nativePath,
            type:"application/msword"
            
        });
 	if(ext=="doc"||ext=="docx")
 	{ 
 		//intent.type="application/msword";
 		
 	}else if(ext=="pdf"){
 		
 		//intent.type="application/pdf";
 	}
		
        try {
            Ti.Android.currentActivity.startActivity(intent);
        } catch(e) {
            Ti.API.debug(e);
            alert('No apps PDF apps installed!='+e);
        }
    }

	
};

//.......................................................News Fetching code is here........


var LoadMoreButtonForPress=Ti.UI.createButton({
	width:Ti.UI.FILL,
	height:'45',
	title:'LoadMore',
	backgroundColor:'#474546',
	color:'#fff',
	bottom:0
	
});

var win=drawer.centerWindow;
var LandHeightForPress=win.rect.height-50;
var tableViewForPress=null;


PressReleaseanurag=function(response){

//var tableData = [];
tableViewForPress = Ti.UI.createTableView({
   backgroundColor:'white',
  top:70,
  height:LandHeightForPress,
  separatorColor:'#DEDEDE',
});

var iLen=response.length;
     	for ( var i = 0; i < iLen; i++)
	 {
	 	var nid=response[i].nid;
//var Fileurl=response[i].Press_Release_Files.match(/src\=([^\s]*)\s/)[1];
//Ti.API.info('fileUrl='+Fileurl);
//imgurl=imgurl.replace(/"/g, "");
//var imgurl=response[i].pic;
Ti.API.info('Events Fetching');
//Ti.API.info('imgurl='+imgurl);
Ti.API.info('nid='+nid);
//Ti.API.info('fileUrl='+fileurl);
  var fileurl=response[i].files;
var fileext = fileurl.split('//');
var ext1 = fileext[fileext.length - 1];
var extar = ext1.split('/');
var ext = extar[extar.length - 1];
Ti.API.info('extention='+ext);
var ext = extar[extar.length - 1];
var extantionOfFile=ext.split(".");
var extatMark=extantionOfFile[extantionOfFile.length - 1];
Ti.API.info('extMark='+extatMark);

  
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'white',
    rowIndex:i, // custom property, useful for determining the row during events
    height:90,
   // url:'PressDetail.js',
    name:'anurag'+i,
  // image:imgurl,
   nid:response[i].nid,
   borderWidth:25,
   borderColor:'#323211',
   borderRadius:43,
   fileName:ext,
   
  });
  
  var imageAvatar = Ti.UI.createLabel({
   // image:imgurl,
   text:response[i].company,
    left:12, top:5,
    width:50, height:50
  });
  //row.add(imageAvatar);
  
  var labelUserName = Ti.UI.createLabel({
    //color:'#576996',
   // font:{fontFamily:'Arial', fontSize:defaultFontSize+1},
    
    font:{fontFamily:'Roboto', fontSize:defaultFontSize+2},
    color:'#3d3d3d',
    text:response[i].node_title,
    left:12, top: 6,
    width:200, height: 25
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    //color:'#222'
    color:'#858585',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, },
    text:response[i].caption,
    left:12, top:34,
    width:360,
    height:24
  });
  row.add(labelDetails);
  
  var labelCompany = Ti.UI.createLabel({
    //color:'#222',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, },
    text:response[i].company,
    left:12, top:64,
    width:360,
    height:24
  });
  row.add(labelCompany);
  

  var imageCalendar = Ti.UI.createImageView({
    image:'down.png',
    right:5,top:20,
    width:36, height: 36,
    fileName:ext,
    fileUrl:fileurl,
    extMar:extatMark
  });
  imageCalendar.addEventListener('click',function(e){
  	
  	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var str=e.source.fileName;
		//str.replace(/%20/g, "_");
		str = require('news').getDisplayName(str);
		str = str.replace(" ", "_");
		var f = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,str);
		
		f.write(this.responseData);
		var intentFileOpenType='';
		if(e.source.extMar=='doc'||e.source.extMar=='docx'){
			intentFileOpenType='application/msword';
		}else if(e.source.extMar=='txt'){
			intentFileOpenType='text/plain';
		}else if(e.source.extMar=='pdf'){
			intentFileOpenType='application/pdf';
		}
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			type : intentFileOpenType,
			data : f.getNativePath()
		});
		try {
		Ti.Android.currentActivity.startActivity(intent);
		}
		catch(e) {
            Ti.API.debug(e);
            alert('No apps installed to open to open ' + e.source.extMar + ' type of files');
        }
	};
 //
xhr.open("GET", e.source.fileUrl);
	xhr.send();
//   	
  // Ti.API.info('fileName='+e.source.fileName);
  	// Ti.API.info('fileUrl='+e.source.fileUrl);
// var xhr = Titanium.Network.createHTTPClient({
    // onload: function() {
        // // first, grab a "handle" to the file where you'll store the downloaded data
        // var f = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,e.source.fileName);
        // Ti.API.info('fileName saved is '+ f.nativePath);
//   
        // f.write(this.responseData); // write to the file
         Ti.API.info("Extantion="+e.source.extMar);
//         
       // myalert(e.source.fileName, f,e.source.extMar);
       // row.file=e.source.fileName;
        // //Ti.App.fireEvent('graphic_downloaded', {filepath:f.nativePath});
       // // row.add({file:e.source.fileName});
//        
    // },
    // timeout: 10000
// });
// xhr.open('GET',e.source.fileUrl);
// xhr.send();
//  
//   	
//   	  	
  });
  row.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#999',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
      text:response[i].startdate,

    left:5, 
    width:Ti.UI.FILL, height:20,
    
    
  });
  //row.add(labelDate);
  
  tableDataPress.push(row);
}
tableViewForPress.setData(tableDataPress);
//..............focus bhai


PressReleaseView.add(tableViewForPress);

//PressReleaseView.add(LoadMoreButtonForPress);
drawer.open();
progressIndicator.hide();


};










//.......................................................News Fetching code is here........
var LoadMoreButton=Ti.UI.createButton({
	width:Ti.UI.FILL,
	height:'45',
	title:'LoadMore',
	backgroundColor:'#474546',
	color:'#fff',
	bottom:0
	
});
var tableViewAnurag=null;
var win=drawer.centerWindow;
var LandHeight=win.rect.height-100;
anurag=function(response){
//var tableDataAnuragNews = [];
	LoadMoreButton.setTitle('loading........................');
	if(response == null)
	{
	   Ti.API.info('No news found');
	  progressIndicator.hide();
	  
	   drawer.open();
	   return;
	}
			Titanium.API.info('anurag count before='+LoadMoreCount);
	if(LoadMoreCount ==5){
		LoadMoreButton.setTitle('Load More');
		Titanium.API.info('anurag count='+LoadMoreCount);
		progressIndicator.hide();
		return;
	}
	 tableViewAnurag = Ti.UI.createTableView({
	//orientationModes: [Ti.UI.PORTRAIT, Ti.UI.PORTRAIT],
  backgroundColor:'white',
  top:80,
  bottom : 45,
  //height:LandHeight,
  separatorColor:'#DEDEDE',
  
});

	var iLen=response.length;
	
     	for ( var i = 0; i < iLen; i++)
	 {
	 		LoadMoreButton.setTitle('loading...');
	 	var nid=response[i].nid;
	 	Ti.API.info('News Fetching');
	 	Ti.API.info("Image="+response[i].field_news_image);
var imgurl=response[i].field_news_image.match(/src\=([^\s]*)\s/)[1];

Ti.API.info('imgurl='+imgurl);Ti.API.info('nid='+nid);
  var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'white',
    rowIndex:i, // custom property, useful for determining the row during events
    height:80,
    url:'detail.js',
    name:'anurag'+i,
   image:imgurl,
   nid:response[i].nid
  });
  imgurl=imgurl.replace(/"/g, "");
  var imageAvatar = Ti.UI.createImageView({
    image: imgurl,
    left:10, top:5,
    width:50, height:50
  });
  row.add(imageAvatar);
  
  var node_title = response[i].node_title.substring(0, 25); 
  node_title = node_title + " ...";
  node_title = require('news').getDisplayName(node_title);
  var labelUserName = Ti.UI.createLabel({
    
    font:{fontFamily:'Roboto', fontSize:defaultFontSize+2},
    color:'#3d3d3d',
    text:node_title,
    left:70, top: 6,
    width:'auto', height: 30,
  });
  row.add(labelUserName);
  
  var cate='';
  for(var k=0;k<response[i].category.length;k++){
  	if(k == 2)
  		break;
  	cate=cate+response[i].category[k]+',';
  }
 var cate=cate.substring(0,cate.length-1);
 cate = require('news').getDisplayName(cate); 
 Ti.API.info('*********Chakresh************cate=' + cate);
 
  var labelDetails = Ti.UI.createLabel({
    
    font:{fontFamily:'Arial', fontSize:defaultFontSize, },
    text:cate,
    left:70, top:35,
    width:360,
    color:'#858585'
  });
  row.add(labelDetails);
  
  var imageCalendar = Ti.UI.createImageView({
  	
    image:IMG_BASE + 'custom_tableview/eventsButton.png',
    right:20, bottom: 2,
    width:32, height: 32
  });
 // row.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#999',
    font:{fontFamily:'Arial', fontSize:defaultFontSize, fontWeight:'normal'},
   // text:response[i],
    right:5,
    width:200, height:20
  });
  //row.add(labelDate);
  	LoadMoreButton.setTitle('loading...........');
 tableDataAnuragNews.push(row);
}

LoadMoreButton.setTitle('Load More');
tableViewAnurag.setData(tableDataAnuragNews);
tableViewAnurag.addEventListener('click', function(e){
    var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : e.rowData.url,
        name:e.rowData.name,
        image:e.rowData.image,
        nid:e.rowData.nid
    });

    wndNewWindow.open();
});

NewsView.add(tableViewAnurag);


LoadMoreButton.addEventListener('click',function(e)
{
	
	if(LoadMoreCount!=5){
	
	LoadMoreCount=LoadMoreCount+1;
	var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss+'&page='+LoadMoreCount;
Ti.API.info('urlnewsFinal='+urlnews);
progressIndicator.show();
{require('news').mybeats(urlnews,anurag, errorHandler);
			drawer.setCenterWindow(NewsView);}
	Ti.API.info('LoadMore Count='+LoadMoreCount);
	}
	else{
		Ti.API.info('else Count='+LoadMoreCount);
		//NewsView.remove(LoadMoreButton);
		LoadMoreButton.hide();
		//height:
		tableViewAnurag.setHeight(LandHeight)
	}
	


			
});
NewsView.add(LoadMoreButton);
drawer.open();
//var TotalWidth=drawer.centerWindow.rect.width;
progressIndicator.hide();
};
//.....................................
var win=drawer.centerWindow;
win.addEventListener('postlayout',function(e){
	var win=drawer.centerWindow;
if(LandHeight!=win.rect.height-100){
	LandHeight=win.rect.height-100;
	if(tableViewAnurag != null)
		tableViewAnurag.setHeight(LandHeight);
}if(LandHeights!=win.rect.height-100){
	//LandHeights=win.rect.height-100;
	if(tableViewForEvents != null)
		tableViewForEvents.setHeight(LandHeights);
}
if(LandHeightForInfluencer!=win.rect.height-50){
	LandHeightForInfluencer=win.rect.height-50;
	if(tableViewForInfluencers != null)
	tableViewForInfluencers.setHeight(LandHeightForInfluencer);
}
if(LandHeightForPress!=win.rect.height-50){
	LandHeightForPress=win.rect.height-50;
if(tableViewForPress != null)
	tableViewForPress.setHeight(LandHeightForPress);
}
		if(event_left != win.rect.width/3)
	{
		    event_left=win.rect.width/3;	
		
		
			Ti.API.info('Post layout called********** Event left='+event_left);
	

			centerLabel.setLeft(event_left);
	
	
var win=drawer.centerWindow;

	//buttonSaveBeatsRequest.top = buttonHeight;
	}
var win=drawer.centerWindow;

	if(event_left2 != win.rect.width/3){
		event_left2=win.rect.width/3;
		centerLabel2.setLeft(event_left2);
	}
	
var win=drawer.centerWindow;

	if(event_left3 != win.rect.width/3){
		event_left3=win.rect.width/3;
	    centerLabelPressRelease.setLeft(event_left3);
	}
var win=drawer.centerWindow;


		if(event_left4 != win.rect.width/3)
		{
			
			event_left4=win.rect.width/3;
			centerLabelinfluenCers.setLeft(event_left4);		
			
		}
var win=drawer.centerWindow;
		
		
		if(influencer_left != win.rect.width/2)
		{
		 influencer_left = win.rect.width/2;
		 
		 	
		Ti.API.info('Post layout called********** influencer left='+influencer_left); 
		rightToolbarBtn.setLeft(influencer_left);
		
		}

var win=drawer.centerWindow;

	 if(influencer_left2 != win.rect.width/2)
		{
		 influencer_left2 = win.rect.width/2;
		 
		 	
		Ti.API.info('Post layout called********** influencer left2='+influencer_left2); 
		 //fourthToolbarBtn.setLeft(influencer_left);
		rightToolbarBtn2.setLeft(influencer_left2);
		
		}
var win=drawer.centerWindow;

	 if(influencer_left3 != win.rect.width/2)
		{
		 influencer_left3 = win.rect.width/2;
		 
		 	
		Ti.API.info('Post layout called********** influencer left=3'+influencer_left3); 
		rightToolbarBtnPressRelease.setLeft(influencer_left3);
			 
		// TheTable.height=table_height;	
		}
var win=drawer.centerWindow;

	 if(influencer_left4 != win.rect.width/2)
		{
		 influencer_left4 = win.rect.width/2;
		 
		 	
		Ti.API.info('Post layout called********** influencer left=4'+influencer_left4); 
		 
		rightToolbarBtninfluenCers.setLeft(influencer_left4);
			 
		// TheTable.height=table_height;	
		}
	 
	
	//adralert('leftwidth width'+drawer.centerWindow.rect.width);
	
	
	
});	

//var window=drawer.centerWindow;

drawer.addEventListener('android:back',function(e){
	
	var confirmClear=Titanium.UI.createAlertDialog({
		message:'Are you sure you want to exit?',
		buttonNames:['Yes','No']
	});
	confirmClear.show();
	confirmClear.addEventListener('click',function(e){
		
		if(e.index==0){
			drawer.close();
			
		}
	});
});






//.........................................................................................
var beatUrlss = beatUrl.substring(0,beatUrl.length-1);
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
var urlnews="http://immservices.in/mediatech/?q=api/mynews&termid="+beatUrlss+'&page=0';
Ti.API.info('urlnewsFinal='+urlnews);
require('news').mybeats(urlnews,anurag, errorHandler);
drawer.open();
	
	
};