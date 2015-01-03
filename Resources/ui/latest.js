var self = Ti.UI.currentWindow;
var lat=self.lat;
var longi=self.longi;
var place=self.place;
self.orientationModes = [
    Titanium.UI.PORTRAIT,Titanium.UI.PORTRAIT
    ];

var labelLat=Ti.UI.createLabel({
	top:10,
	left:10,font:{fontFamily:'Roboto',// fontSize:defaultFontSize+2
   fontWeight:'bold' },
    color:'#3d3d3d',
    
	text:'Events Near by your Location :-'
	
});
var labelLong=Ti.UI.createLabel({
	top:30,
	text:place
	
});
var labelPlace=Ti.UI.createLabel({
	top:30,
	text:'Latest'
	
});
//self.add(labelLat);
//self.add(labelLong);
self.add(labelPlace);


var progressIndicator = Ti.UI.Android.createProgressIndicator({
  message: 'Loading...',
  location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
  type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
  cancelable: false,
  
});


errorHandler = function(err) 
 {
 	progressIndicator.hide();
 	alert("Please Check Your DATA Connnection");
 };

EventsDataFetchingFunction=function(response){
var tableData = [];

var iLen=response.length;
Ti.API.info('length=******='+iLen);


Ti.API.info('ProbResponse=******='+JSON.stringify(response));
var nidobj = {
	nidArray : new Array()
};

var fileurl='';
var ext='';
var extatMark='';

     for ( var i = 0; i < iLen; i++)
	 {
	 	if(nidobj.nidArray.indexOf(response[i].nid)== -1)
	 	{
	 		nidobj.nidArray.push(response[i].nid);
			var type=response[i].type;
	 		var nid=response[i].nid;
//var imgurl=response[i].pic.match(/src\=([^\s]*)\s/)[1];
//imgurl=imgurl.replace(/"/g, "");
var imgurl='';
if(type!='press_release')
imgurl=response[i].pic;
//Ti.API.info('Events Fetching');
Ti.API.info('imgurl='+imgurl);
Ti.API.info('nid='+nid);
var urlvalue='';

if (type=='news'){
urlvalue='detail.js';

}else if(type=='events'){
urlvalue='EventsDetaiAl.js';
}else if(type=='influencers'){

urlvalue='InfluencerDetail.js';

}
else if(type=='press_release'){
	fileurl=response[i].file;
var fileext = fileurl.split('//');
var ext1 = fileext[fileext.length - 1];
var extar = ext1.split('/');
ext = extar[extar.length - 1];
Ti.API.info('extention='+ext);
var ext = extar[extar.length - 1];
var extantionOfFile=ext.split(".");
 extatMark=extantionOfFile[extantionOfFile.length - 1];
Ti.API.info('extMark='+extatMark);

  

}



var row = Ti.UI.createTableViewRow({
    className:'forumEvent', // used to improve table performance
    selectedBackgroundColor:'white',
    rowIndex:i, // custom property, useful for determining the row during events
    height:80,
    url:urlvalue,
    v_type:type,
    name:'anurag'+i,
  image:imgurl,
   nid:response[i].nid,
   fileUrl:fileurl,
   fileName:ext,
   extantion:extatMark
  });
//if(type!='press_release')
{
  
//   
   var imageAvatar = Ti.UI.createImageView({
     image:imgurl,
     
      left:10, top:5,
      width:50, height:50
    });
  //  alert("Please Check Your DATA Connnection AAAAAAAAAAAAAAAAAAAAAAAA");
      //  Ti.API.info('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN');

  row.add(imageAvatar);
// //   
  
  var node_title = response[i].title.substring(0, 25);
   node_title+= " ...";
  var labelUserName = Ti.UI.createLabel({
    //color:'#576996',
    //font:{fontFamily:'Arial', fontSize:defaultFontSize+3, fontWeight:'bold'},
    
    font:{fontFamily:'Roboto',// fontSize:defaultFontSize+2
    },
    color:'#3d3d3d',
    
    text:node_title,
    left:70, top: 6,
    width:200, height: 25
  });
  row.add(labelUserName);
  
  var labelDetails = Ti.UI.createLabel({
    color:'#858585',
    font:{fontFamily:'Arial', //fontSize:defaultFontSize
    },
    text:require('news').getDisplayName(response[i].type),
    left:70, top:34,
    width:360
  });
  row.add(labelDetails);
  
  // var imageCalendar = Ti.UI.createImageView({
    // image:IMG_BASE + 'custom_tableview/eventsButton.png',
    // right:5, bottom: 2,
    // width:32, height: 32
  // });
  // row.add(imageCalendar);
  
  var labelDate = Ti.UI.createLabel({
    color:'#999',
    font:{fontFamily:'Arial', //fontSize:defaultFontSize, 
    fontWeight:'normal'},
    text:require('news').getDisplayName(response[i].category[0]),
    right:5, 
    height:20
  });
  row.add(labelDate);
  
  tableData.push(row);
}		
	 	}
	 	
	 }
var tableView = Ti.UI.createTableView({
  backgroundColor:'white',
  data:tableData,top:80,
  height:Ti.UI.FILL,
  separatorColor:'#DEDEDE',
});

tableView.addEventListener('click', function(e){

if(e.rowData.v_type!='press_release'){
	    var wndNewWindow = Ti.UI.createWindow({
        backgroundColor : '#fff',
        url             : e.rowData.url,
       // name:e.rowData.name,
       // image:e.rowData.image,
        nid:e.rowData.nid
    });

    wndNewWindow.open();
}else{
	
	//alert('Press release is clicked');
	
	
  	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var str=e.rowData.fileName;
		//str.replace(/%20/g, "_");
		str = decodeURI(str);
		str = str.replace(" ", "_");
		var f = Ti.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory,str);
		
		f.write(this.responseData);
		var intentFileOpenType='';
		// fileUrl:fileurl,
   
   
		if(e.rowData.extantion=='doc'||e.rowData.extantion=='docx'){
			intentFileOpenType='application/msword';
		}else if(e.rowData.extantion=='txt'){
			intentFileOpenType='text/plain';
		}else if(e.rowData.extantion=='pdf'){
			intentFileOpenType='application/pdf';
		}
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			type : intentFileOpenType,
			data : f.getNativePath()
		});
		Ti.Android.currentActivity.startActivity(intent);
	};
 //
xhr.open("GET", e.rowData.fileUrl);
	xhr.send();
	
}

});
self.add(tableView);
//EventsView.add(tableView);
//EventsView.add(MyEventButton);
//drawer.open();
progressIndicator.hide();
};



var beatUrlss = require('db').GetSelectedBeatsInPlusString();
	Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
//var urlnews="http://immservices.in/mediatech/?q=api/events&termid="+beatUrlss;
	
	progressIndicator.show();
	//var anuUrl='http://immservices.in/mediatech/ajaxCalls.php?fromLongitude='+longi+'&fromLatitude='+lat+'&termid='+beatUrlss;
	var anuUrl="http://www.immservices.in/mediatech/latest.php?termid=" + beatUrlss;
	Ti.API.info('anu url='+anuUrl);
	require('news').mybeats(anuUrl,EventsDataFetchingFunction, errorHandler);
	
/*
var newsurl='http://immservices.in/mediatech/?q=api/fullevent&eventid='+nid;

Ti.API.info('event id='+nid);
Ti.API.info('event url='+newsurl);

var progressIndicator = Ti.UI.Android.createProgressIndicator({
  message: 'Loading...',
  location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
  type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
  cancelable: false,
  
});

 errorHandler = function(err) 
 {
 	alert("Please Check Your Data Connection");
 	progressIndicator.hide();
 };


anurag=function(response){
	
	var iLen=response.length;
     	
var nodTitle=response[0].node_title;
Ti.API.info('event title='+response[0].node_title);
var category=response[0].category[0];

var newsbody=response[0].Body;

var imgurl=response[0].pic.match(/src\=([^\s]*)\s/)[1];
imgurl=imgurl.replace(/"/g, "");
var defaultFontSize=10;

  var NewsTitle = Ti.UI.createLabel({
    color:'#576996',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    text:nodTitle,
    left:5, top: 1,
    width:200, height: 30
  });
  
  
  
var NewsImage= Ti.UI.createImageView({
    image: imgurl,
    left:10, top:30,right:10,
    width:Ti.UI.FILL, height:100
  });
  
 
  var NewsCategory = Ti.UI.createButton({
    color:'white',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    title:category,
    left:2, 
    top: 130,
    width:'auto',
    backgroundColor:'#67D5F3',
     height: 30
  });
  


   
  var NewsBody = Ti.UI.createLabel({
    
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, },
    text:newsbody,
    left:2,
    width:Ti.UI.FILL, height:Ti.UI.FILL
      });
var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  height: '80%',
  width: '100%',
  top:160
});
var opts={};
 var shareButton=Ti.UI.createButton({
  	color:'white',
  	title:'invite me',
  	top:1,
  	right:4,
  	width:65,
  	height:25,
  	backgroundColor:'#67D5F3'
  	
  });
  shareButton.addEventListener('click',function(e){
  	var data=require('db').getUserData();
  var name=data[0].name;
  var email=data[0].email;
  var mobile=data[0].mobile;
  var org=data[0].org;
  	var check;
  	if(name==''||email==''||mobile==''||org==''){
  		
  		check=0;
  	}
  	else{
  		check=1;
  	}
  	
  	if(check){
  		var blogPost = {
	eventid:nid,
    email:email,
    mobile:mobile,
    organization:org,
    name:name
  };
  		
			var xhr = Ti.Network.createHTTPClient({
    onload: function(response) {
        // handle the response
        var res=JSON.parse(this.responseText);
        alert(res.Response);
        
        
         //alert('success');
    },
    onerror : function(e) {
         Ti.API.debug(e.error);
        // alert('error' + e.error);
     }
	});
 
   xhr.open('GET','http://immservices.in/mediatech/ajaxCalls.php');

	
	xhr.send(blogPost);
	
  		
  		//alert('check is true');
  		
  	}else{
  		
  		
	var loginView =Ti.UI.createView({
		layout:'vertical',
		backgroundColor:'white',
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var txtUserName = Ti.UI.createTextField({
		hintText:'User Name',
		top:12,
		color:'#000',
		width:Ti.UI.FILL,
		value:name
	});
	loginView.add(txtUserName);
	
	var txtemail = Ti.UI.createTextField({
		hintText:'Password',
		//passwordMask:true,
		top:12,color:'#000',
		width:Ti.UI.FILL,
		value:email
	});
	loginView.add(txtemail);
	var txtMobile = Ti.UI.createTextField({
		hintText:'Mobile',
		//passwordMask:true,
		top:12,
		color:'#000',
		width:Ti.UI.FILL,
		value:mobile
	});
	loginView.add(txtMobile);
	var txtorg = Ti.UI.createTextField({
		hintText:'Organization',
		//passwordMask:true,
		top:12,
		color:'#000',
		width:Ti.UI.FILL,
		value:org
	});
	loginView.add(txtorg);
	
	opts.title = 'Check/Update Your Information ';
	opts.buttonNames = ['Update&Send','Cancel'];
	opts.options = ['India','UK','USA']; // This will never care about this options
	opts.androidView = loginView;
	
	var dialog = Ti.UI.createOptionDialog(opts);
	dialog.addEventListener('click',function(e){
			if(e.button)
			{
				if(e.index<0){
				//alert('You pressed back button!, I am right?');
				}
				else if(e.index==0)
				{
				//alert('Login Button Clicked!');
				//Your Login checking logic here
				
	var blogPost = {
	eventid:19,
    email: txtemail.value,
    mobile:txtMobile.value,
    organization:txtorg.value,
    name:txtUserName.value
  };
				var xhr = Ti.Network.createHTTPClient({
    onload: function(response) {
        // handle the response
        //alert(response);
         Ti.API.info("Received text: " + this.responseText);
         //alert('success');
    },
    onerror : function(e) {
         Ti.API.debug(e.error);
         //alert('error' + e.error);
     }
	});
 
   xhr.open('GET','http://immservices.in/mediatech/ajaxCalls.php');

	
	xhr.send(blogPost);
	var UserDataForUpdate = {
	email: txtemail.value,
    mobile:txtMobile.value,
    org:txtorg.value,
    name:txtUserName.value
  };
	
require('db').UpdateUserInfo(UserDataForUpdate);	

				}
				else
				{
					alert('Invitation not send by you.... :)');
				}
			}			
			
	});
	dialog.show();



  		
 	}
  	
  	
  	  });
  

scrollView.add(NewsBody);  
 
  self.add(NewsTitle);
  self.add(NewsCategory);
  self.add(NewsImage);
  self.add(scrollView);
self.add(shareButton); 
progressIndicator.hide();
};
progressIndicator.show();
require('news').mybeats(newsurl,anurag, errorHandler);

*/

// 
// imgurlforimgavtar = imgurlforimgavtar.replace(/"/g, "");
// Ti.API.info('NotWorkingUrl='+imgurlforimgavtar+'checkk');
// Ti.API.info('NotWorkingUrl chakresh and anurag working');
