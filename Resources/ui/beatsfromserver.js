exports.BeatsFromServer=function(){
	
	
	var win=Ti.UI.createWindow({
	backgroundColor:'white',fullscreen:true,
	
	
});
var data=[];
  
var table_height=win.rect.height-115;
var TheTable = Titanium.UI.createTableView({top:'70',height:table_height});
 
 errorHandler = function(err) 
 {
 	//alert("failed");
 	Ti.API.info('failed');
 };
 
anurags=function(response){
 	//alert('anurag call='+response);
   
 	var iLen=response.length;
     	for ( var i = 0; i < iLen; i++)
	 {

	var row = Titanium.UI.createTableViewRow();

	var country = Titanium.UI.createLabel({
		text:response[i].name,
		font:{fontSize:18,fontWeight:'bold'},
		width:'auto',
		textAlign:'left',
		top:30,
		left:100,
		height:20,
		color:'black',
		termid:response[i].termid
	});

var basicSwitchs = Ti.UI.createSwitch({
  style: Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
  textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT,
  title:'',
  value:true,
 left:50,
  width: 300 ,top:30
 // necessary for textAlign to be effective
 
});
	row.add(country);
	row.add(basicSwitchs);
	data.push(row);

		Ti.API.info(response[i].termid);
		Ti.API.info(response[i].name);
		
	}
	
TheTable.setData(data);

//win=Ti.UI.currentWindow;
win.add(TheTable);
win.open();
 };

//var url = "http://immservices.in/mediatech/?q=api/allbeats";
 require('news').mybeats("http://immservices.in/mediatech/?q=api/newsbeats",anurags, errorHandler);
//win.open();

var actionBars = Ti.UI.createView({
	top:0,
	height:"40dp",
	backgroundColor:"#fff"
});
var leftToolbarBtns = Ti.UI.createLabel({

	font:{fontSize:20,fontWeight:'bold'},
	image:'news.png',
text:'Beat you want to cover',
color:'#000',
backgroundColor:'#fff'
	
});

actionBars.add(leftToolbarBtns);


win.add(actionBars);
var buttonHeight = win.rect.height-45;

var buttonSaveBeatsRequest=Ti.UI.createButton({
title:'Next',
width:'100%',
top:buttonHeight,
height:'45',
backgroundColor:'#474546',

color:'white'
	
});
buttonSaveBeatsRequest.addEventListener('click',function(e){
	 Ti.API.info("width: " + win.rect.width);
    Ti.API.info("height: " + win.rect.height);
	Ti.API.info('beatName='+TheTable.data[0].rows[0]);
		Ti.API.info('beatName='+TheTable.data[0].rows[0].children[0]);
		
		//	Ti.API.info('beatName='+TheTable.data[0].rows[0].country.text);
for(var k=0;k<data.length;k++){
	Ti.API.info('beatName='+TheTable.data[0].rows[k].children[0].text);
		Ti.API.info('beatName='+TheTable.data[0].rows[k].children[0].termid);

	Ti.API.info('beatName='+TheTable.data[0].rows[k].children[1].value);
	//Ti.API.info('beatName='+TheTable.data[0].rows[0]);
//	Ti.API.info('switch='+data.rows[k].children[2].value);
var checkstatus;

if(TheTable.data[0].rows[k].children[1].value)
{
	checkstatus=1;
}
else
{
	checkstatus=0;
}

require('db').addItem({beatname:TheTable.data[0].rows[k].children[0].text,termId:TheTable.data[0].rows[k].children[0].termid,status:checkstatus});
	
}	
	
	
	
	
	require('userinformation').UserInformation();
	win.close();
});

win.add(buttonSaveBeatsRequest);
// 
win.addEventListener('postlayout',function(e){
	if(buttonHeight != win.rect.height-45)
	{
	buttonHeight=win.rect.height-45;	
	buttonSaveBeatsRequest.top = buttonHeight;
	}
		if(table_height != win.rect.height-115)
		{
		 table_height=win.rect.height-115;	
		 TheTable.height=table_height;	
		}
	
	 
	//alert('height'+buttonHeight);
	
	
	
});	
	
	
	
};
