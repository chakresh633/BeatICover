var self = Ti.UI.currentWindow;
var imgurlforimgavtar=self.image;
var nid=self.nid;
var newsurl='http://immservices.in/mediatech/?q=api/fullinfluencers&influid='+nid;


 errorHandler = function(err) 
 {
 	alert("Please Check Your Data Connection");
 };


anurag=function(response){
	
	var iLen=response.length;
     	
var nodTitle=response[0].node_title;

var category=response[0].category[0];

var newsbody=response[0].Body;

var imgurl=response[0].influeners_pic.match(/src\=([^\s]*)\s/)[1];
imgurl=imgurl.replace(/"/g, "");
var defaultFontSize=10;

  var NewsTitle = Ti.UI.createLabel({
//    color:'#576996',
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
   // color:'#576996',
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
 var shareButton=Ti.UI.createButton({
  	color:'white',
  	title:'Share',
  	top:1,
  	right:4,
  	width:65,
  	height:25,
  	backgroundColor:'#67D5F3'
  	
  });
  shareButton.addEventListener('click',function(e){
  	var intent = Ti.Android.createIntent({
    action: Ti.Android.ACTION_SEND,
    type: "text/plain"
});

intent.putExtra(Ti.Android.EXTRA_TEXT, newsbody);
intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
Ti.Android.currentActivity.startActivity(intent);
  	
  	
  });
  

scrollView.add(NewsBody);  
 
  self.add(NewsTitle);
  self.add(NewsCategory);
  self.add(NewsImage);
  self.add(scrollView);
self.add(shareButton); 

};
require('news').mybeats(newsurl,anurag, errorHandler);



// 
// imgurlforimgavtar = imgurlforimgavtar.replace(/"/g, "");
// Ti.API.info('NotWorkingUrl='+imgurlforimgavtar+'checkk');
// Ti.API.info('NotWorkingUrl chakresh and anurag working');
