exports.UserInformation=function(){
	
	var win =Ti.UI.createWindow({
	backgroundColor:'#fff'
});
var SECONDS = 3000;
// every 10 seconds
var intent = Titanium.Android.createServiceIntent({
    url : 'notification.js'
});
intent.putExtra('interval', SECONDS * 1000);
// Needs to be milliseconds
  
if (!Ti.Android.isServiceRunning(intent)) {
    Titanium.Android.startService(intent);
}
var editName=Ti.UI.createTextField({
	hintText:'Name',
	left:'10',
	right:'10',
	top:'50',
	height:'40'
});
var editEmail=Ti.UI.createTextField({
	
	hintText:'Email',
	left:'10',
	right:'10',
	top:'100',
	height:'40'
});

var editMobile=Ti.UI.createTextField({
	
	hintText:'Mobile No (OPTIONAL)',
	left:'10',
	right:'10',
	top:'150',
	height:'40',
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
});

var editOrgainzation=Ti.UI.createTextField({
	hintText:'Organization',
	left:'10',
	right:'10',
	top:'200',
	height:'40'
	
});

var label=Ti.UI.createLabel({
	top:'290',
	text:'Why Register?',
	width:Ti.UI.FILL,
	height:'20',
	textAlign:'center'
	
});
var opts={};
var WhyIRegisterView =Ti.UI.createView({
		layout:'vertical',
		backgroundColor:'white',
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var labelWhyIRegisterData=Ti.UI.createLabel({
		width:'200',
		height:100,
		
		text:'Register to get invites for events around you.'
	});
	WhyIRegisterView.add(labelWhyIRegisterData);
	
opts.title = ' Why Register ?';
opts.androidView = WhyIRegisterView;
label.addEventListener('click',function(e){
	
	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.show();

});

var table_height=win.rect.height-45;

var SaveButton=Ti.UI.createButton({
	
	title:'SAVE',
	top:table_height,
	width:'50%',
	left:'10',
	backgroundColor:'#7DDFFA'
	
});

var SkipButton=Ti.UI.createButton({
	title:'SKIP',
	top:table_height,
	width:'50%',
	right:'10',
	backgroundColor:'#7DDFFA'
});

SkipButton.addEventListener('click',function(e){
	require('db').SaveUserInformation({name:editName.value,email:editEmail.value,mobile:editMobile.value,organization:editOrgainzation.value});
	
	require('NewsServer').newsPannel();
	win.close();
});
//var dbAnurag=require('db');
var check=require('checkvalid');
SaveButton.addEventListener('click',function(e){
	 if (editName.value != '' && editEmail.value != '' && editOrgainzation.value != '' )
    {
    	var R=check.checkemail(editEmail.value);
    
    	
    	if(R){
    		
    			//var RR=check.checkContact(editMobile.value);
    			//if(RR){
    				var db=require('db');
    				db.SaveUserInformation({ flag:1,name:editName.value,email:editEmail.value,mobile:editMobile.value,organization:editOrgainzation.value});
	require('NewsServer').newsPannel();
	win.close();
    			//}
    			//else
    			//{
    				//alert('Invalid Mobile Number');
    				//}
    		
    	}else{
    	alert('Email Not Correct');	
    	}
    	
    }
    else
    {
        alert("All fields are required");
    }
	//check.checkemail(editEmail.value);
	//db.SaveUserInformation({ flag:1,name:editName.value,email:editEmail.value,mobile:editMobile.value,organization:editOrgainzation.value});
	//require('NewsServer').newsPannel();
	//win.close();
});

win.addEventListener('postlayout',function(e){
	
	if(table_height != win.rect.height-45)
	{
		table_height=win.rect.height-45;
        SaveButton.top=table_height;
	    SkipButton.top=table_height;
			
	}
    //alert('height'+buttonHeight);



	
});	
win.add(SkipButton);
win.add(SaveButton);

win.add(editName);
win.add(editEmail);

win.add(editMobile);
win.add(editOrgainzation);
win.add(label);

win.open();

	
};
