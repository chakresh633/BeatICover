var self = Ti.UI.currentWindow;
var imgurlforimgavtar=self.image;
var nid=self.nid;
var newsurl='http://immservices.in/mediatech/?q=api/fullevent&eventid='+nid;

Ti.API.info('event id='+nid);
Ti.API.info('event url='+newsurl);



self.orientationModes = [
    Titanium.UI.PORTRAIT
    ];

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
//nodTitle = getDisplayName(nodTitle);
Ti.API.info('event title='+response[0].node_title);
var category = require('news').getDisplayName(response[0].category[0]);
//var category = getDisplayName(category1);
var newsbody=response[0].Body;
//newsbody = getDisplayName(newsbody);
var location = response[0].Location;
Ti.API.info('event location='+ location);
var startDate = response[0].startdate;
Ti.API.info('event date='+ startDate);




var imgurl=response[0].pic.match(/src\=([^\s]*)\s/)[1];
imgurl=imgurl.replace(/"/g, "");
Ti.API.info("ImageFUllEventUrl+="+imgurl);
var defaultFontSize=10;

  var NewsTitle = Ti.UI.createLabel({
  	left:0,
    color:'#576996',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    text:nodTitle,
    top: 5,
    width:Ti.UI.SIZE, 
    height: Ti.UI.SIZE
  });
  // full message date view table
   var StartDate = Ti.UI.createLabel({
    color:'#576996',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    text:startDate,
    left:5, top: 212,
    width:'auto', height: 'auto'
  });
  
var NewsImage= Ti.UI.createImageView({
    image: imgurl,
    top:10,
    width:"320px", 
    height:"140px"
  });
  
  
  var titleAndImageContainer = Ti.UI.createView({
  	top:0,
  	layout : "vertical",
  	left:8,
  	right:8,
  	bottom:0
  });
  
 
 titleAndImageContainer.add(NewsTitle);
 titleAndImageContainer.add(NewsImage);
 
  var NewsImage= Ti.UI.createImageView({
    image: imgurl,
    top:10,
    width:Ti.UI.FILL, 
    height:120
  });
  
 var NewsCategory = Ti.UI.createButton({
    color:'white',
    font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    title:category,
    left:0, 
    width: "47%",
    backgroundColor:'#67D5F3',
     height: 30,
  });
  


   
  var NewsBody = Ti.UI.createLabel({
    
    text:'Date: '+startDate+'\n'+ 'Location: '+location+'\n'+'Details: '+newsbody,
    left:2,
    width:Ti.UI.FILL, height:Ti.UI.FILL
      });
      
      
    var rowDate = Ti.UI.createView({
    backgroundColor: 'white',
    //borderColor: '#ff0000',
    //borderWidth: 5,
    width:'100%',
    height : Ti.UI.SIZE,
    top: 0, left: 0,
    layout:"vertical"
  });
  
      
      var Date=Ti.UI.createLabel({
      	left:2,
      	text:'Date',
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6,fontWeight:'bold' },
      	width:Ti.UI.FILL, 
      	height:Ti.UI.FILL,
      	top:10
      	
      });
      rowDate.add(Date);
       
      var DateDescription=Ti.UI.createLabel({
      	left:2,
      	text:startDate,
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6},
      	width:Ti.UI.FILL, 
      	height:Ti.UI.FILL,
      	top:6
      	
      });
      rowDate.add(DateDescription);
      
    var rowLocation = Ti.UI.createView({
    backgroundColor: 'white',
    //borderColor: '#bbb',
    //borderWidth: 1,
    width:'100%',
    height:Ti.UI.SIZE,
    top: 10, left: 0,
    layout:'vertical'
  });
  
         var locations=Ti.UI.createLabel({
      	left:2,
      	text:'Location',
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6,fontWeight:'bold'},
      	width:Ti.UI.FILL, 
      	height:Ti.UI.FILL,
      	top:10
      	
      });
      rowLocation.add(locations);
         var LocationDescription=Ti.UI.createLabel({
      	left:2,
      	text:location,
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6},
      	width:Ti.UI.FILL, 
      	height:Ti.UI.FILL,
      	top:10
      	
      });
      rowLocation.add(LocationDescription);
     var rowDetail = Ti.UI.createView({
    backgroundColor: 'white',
   // borderColor: '#bbb',
    //borderWidth: 1,
    width:'100%',
    height:Ti.UI.SIZE,
    top: 6, left: 0,
    layout:'vertical'
  });
      
      //rowDetail.add(dd);
         var dd=Ti.UI.createLabel({
      	left:2,
      	text:'Detail',
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6,fontWeight:'bold'},
      	width:Ti.UI.FILL, 
      	height:Ti.UI.SIZE,
      top:5
      	
      });
      rowDetail.add(dd);
         var Detail=Ti.UI.createLabel({
      	left:2,
      	text:newsbody,
      	font:{fontFamily:'Arial', fontSize:defaultFontSize+6},
      	width:Ti.UI.FILL, 
      	height:Ti.UI.SIZE,
      top:6
      	
      });
      rowDetail.add(Detail);
      
var scrollView = Ti.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true,
  width: '100%',
  top:10,
  bottom : 10
});

var detailView = Ti.UI.createView({
    backgroundColor: 'white',
    //borderColor: '#bbb',
    //borderWidth: 1,
    //width:'100%',
    height:Ti.UI.SIZE,
    top: 0, left: 8,
    right:8,
    layout:'vertical'
  });


detailView.add(rowDate);
detailView.add(rowLocation);
detailView.add(rowDetail);
scrollView.add(detailView);
	
var opts={};
 var shareButton=Ti.UI.createButton({
  	color:'white',
  	title:'Invite Me Please',
  	left:"6%",
  	width:"47%",
  	height:30,
  	backgroundColor:'#67D5F3'
  	
  });
  
  
  var categoryAndInvideMeContainer = Ti.UI.createView({
  	top:20,
  	layout:"horizontal",
  	left:0,
  	right:0,
  	height:Ti.UI.SIZE
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
        //alert(res.Response);
        alert("Your official Id's will be checked on the spot");
        
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
		hintText:'UserName',
		top:12,
		color:'#000',
		width:Ti.UI.FILL,
		value:name
	});
	loginView.add(txtUserName);
	
	var txtemail = Ti.UI.createTextField({
		hintText:'email',
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
				
 if (txtemail.value != '' && txtUserName.value != '' && txtorg.value != '' )
{
	var check=require('checkvalid');
	var R=check.checkemail(txtemail.value);
    if(R){
    		//you have to write code over here for validation
	var blogPost = {
	eventid:nid,
    email: txtemail.value,
    mobile:txtMobile.value,
    organization:txtorg.value,
    name:txtUserName.value
  };
	var xhr = Ti.Network.createHTTPClient({
    onload: function(response) {
        // handle the response
        //alert(response);
         //Ti.API.info("Received text: " + this.responseText);
         //alert('success');
         alert("Your official Id's will be checked on the spot");
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

	}else{
    	alert('Email Not Correct');	
    	}
    
	
}
 else
    {
        alert("All fields are required");
    }
	

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
  
//scrollView.add(StartDate);
//scrollView.add(Date);
//scrollView.add(DateDescription);
//scrollView.add(Detail);  
  //self.add(NewsTitle);
  categoryAndInvideMeContainer.add(NewsCategory);
  categoryAndInvideMeContainer.add(shareButton);
  titleAndImageContainer.add(categoryAndInvideMeContainer);
  titleAndImageContainer.add(scrollView);
  self.add(titleAndImageContainer);
  //self.add(NewsCategory);
  //self.add(NewsImage);
  
 // self.add(StartDate);

//self.add(shareButton); 
//scrollView.add(Date);scrollView.add(DateDescription);
//scrollView.add(locations);
//scrollView.add(LocationDescription);
//scrollView.add(dd); scrollView.add(Detail);
//self.add(scrollView);
//alert("self bottom:"+self.bottom+"  scrollview bottom"+scrollView.bottom)
progressIndicator.hide();
};
progressIndicator.show();
require('news').mybeats(newsurl,anurag, errorHandler);



// 
// imgurlforimgavtar = imgurlforimgavtar.replace(/"/g, "");
// Ti.API.info('NotWorkingUrl='+imgurlforimgavtar+'checkk');
// Ti.API.info('NotWorkingUrl chakresh and anurag working');
