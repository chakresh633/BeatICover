var self = Ti.UI.currentWindow;
var imgurlforimgavtar = self.image;
var nid = self.nid;
var newsurl = 'http://immservices.in/mediatech/?q=api/news&nid=' + nid;

/**
 * Returns croped image view
 */
// function getCropedImageView(imgurl) {
// 
    // // // Here's our base (full-size) image.
    // // // It's never displayed as-is.
    // // var baseImage = Titanium.UI.createImageView({
    // // image : imgurl,
    // // width : 512,
    // // height : 512,
    // // });
    // //
    // // // Here's the view we'll use to do the cropping.
    // // // It's never displayed either.
    // // var cropView = Titanium.UI.createView({
    // // width : 100,
    // // height : 100
    // // });
    // //
    // // // Add the image to the crop-view.
    // // // Position it left and above origin.
    // // cropView.add(baseImage);
    // // baseImage.left = -200;
    // // baseImage.top = -200;
    // //
    // // // now convert the crop-view to an image Blob
    // // var croppedImage = cropView.toImage();
    // //
    // // // make an imageView containing the image Blob
    // // var imageView = Titanium.UI.createImageView({
    // // image : croppedImage,
    // // width : 100,
    // // height : 100
    // // });
    // //
    // // // add it to the window
    // // //win1.add(imageView);
// 
    // var container = Titanium.UI.createView({
        // width : "320px",
        // height : "140px",
        // borderRadius : 0,
        // //borderWidth : 5,
        // //borderColor : 'red'
    // });
// 
    // var image = Titanium.UI.createImageView({
        // //image : "http://www.magforwomen.com/wp-content/uploads/2013/03/fun-facts-about-the-november-birth-flower.jpg",
        // //image:"http://polly.photography/images/pint_it.png",
        // image: imgurl,
        // height : "140px",
        // width : "320px",
        // //borderWidth : 3,
        // //borderColor : 'black'
    // });
    // container.add(image);
// 
    // return container;
// 
// }

errorHandler = function(err) {
    alert("Please Check Your Data Connection");
};

anurag = function(response) {

    var iLen = response.length;

    var nodTitle = response[0].node_title;

    var category = require('news').getDisplayName(response[0].category[0]);

    var newsbody = response[0].Body;

    var imgurl = response[0].field_news_image.match(/src\=([^\s]*)\s/)[1];
    imgurl = imgurl.replace(/"/g, "");
    var defaultFontSize = 10;

    // var NewsTitle = Ti.UI.createLabel({
    // //color:'#576996',
    // font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    // text:nodTitle,
    // left:5, top: 1,
    // width:'auto', height: 'auto'
    // });

    var NewsTitle = Ti.UI.createLabel({
        left : 0,
        color : '#576996',
        font : {
            fontFamily : 'Arial',
            fontSize : defaultFontSize + 6,
            fontWeight : 'bold'
        },
        text : nodTitle,
        top : 5,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE
    });

    Ti.API.info('*********' + imgurl);

    // var NewsImage= Ti.UI.createImageView({
    // image: imgurl,
    // left:10 ,right:10,top : 80,
    // width:"140px", height:"320px"
    // });

    var NewsImage = Ti.UI.createImageView({
        image : imgurl,
        top : 10,
        width : "320px",
        height : "140px"
    });

    var titleAndImageContainer = Ti.UI.createView({
        top : 0,
        layout : "vertical",
        left : 8,
        right : 8,
        height : Ti.UI.SIZE
    });

    titleAndImageContainer.add(NewsTitle);
    titleAndImageContainer.add(NewsImage);
    //titleAndImageContainer.add(getCropedImageView(imgurl));

    // var NewsCategory = Ti.UI.createButton({
    // color:'white',
    // font:{fontFamily:'Arial', fontSize:defaultFontSize+6, fontWeight:'bold'},
    // title:category,
    // left:20,
    // top : 180,
    // width:'auto',
    // backgroundColor:'#67D5F3',
    // height: 30
    // });

    var NewsCategory = Ti.UI.createButton({
        color : 'white',
        font : {
            fontFamily : 'Arial',
            fontSize : defaultFontSize + 6,
            fontWeight : 'bold'
        },
        title : category,
        left : 0,
        width : "47%",
        backgroundColor : '#67D5F3',
        height : 30,
    });

    var NewsBody = Ti.UI.createLabel({
        //  color:'#576996',
        font : {
            fontFamily : 'Arial',
            fontSize : defaultFontSize + 6,
        },
        text : newsbody,
        left : 2,
        width : Ti.UI.FILL,
        height : Ti.UI.FILL
    });

    // var scrollView = Ti.UI.createScrollView({
    // contentWidth: 'auto',
    // contentHeight: 'auto',
    // showVerticalScrollIndicator: true,
    // showHorizontalScrollIndicator: true,
    // height: '50%',
    // width: '100%',
    // // bottom:100,
    // top:220
    //
    // });

    var scrollView = Ti.UI.createScrollView({
        contentWidth : 'auto',
        contentHeight : 'auto',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : true,
        width : '100%',
        top : 10,
        bottom : 10
    });

    // var detailView = Ti.UI.createView({
    // backgroundColor: 'white',
    // //borderColor: '#bbb',
    // //borderWidth: 1,
    // //width:'100%',
    // height:Ti.UI.SIZE,
    // top: 0, left: 8,
    // right:8,
    // layout:'vertical'
    // });

    scrollView.add(NewsBody);
    //detailView.add(rowLocation);
    //detailView.add(rowDetail);
    //scrollView.add(detailView);

    // var shareButton=Ti.UI.createButton({
    // color:'white',
    // title:'Share',
    // top:180,
    // right:4,
    // width:65,
    // height:30,
    // backgroundColor:'#67D5F3'
    //
    // });

    var shareButton = Ti.UI.createButton({
        color : 'white',
        title : 'Invite Me Please',
        left : "6%",
        width : "47%",
        height : 30,
        backgroundColor : '#67D5F3'

    });

    var categoryAndInvideMeContainer = Ti.UI.createView({
        top : 20,
        layout : "horizontal",
        left : 0,
        right : 0,
        height : Ti.UI.SIZE
    });

    shareButton.addEventListener('click', function(e) {
        var intent = Ti.Android.createIntent({
            action : Ti.Android.ACTION_SEND,
            type : "text/plain"
        });

        intent.putExtra(Ti.Android.EXTRA_TEXT, newsbody);
        intent.addCategory(Ti.Android.CATEGORY_DEFAULT);
        Ti.Android.currentActivity.startActivity(intent);

    });

    //scrollView.add(NewsBody);

    //self.add(titleAndImageContainer);
    //self.add(NewsCategory);
    //self.add(NewsImage);
    //self.add(scrollView);
    //self.add(shareButton);

    categoryAndInvideMeContainer.add(NewsCategory);
    categoryAndInvideMeContainer.add(shareButton);
    titleAndImageContainer.add(categoryAndInvideMeContainer);
    titleAndImageContainer.add(scrollView);
    self.add(titleAndImageContainer);

};
require('news').mybeats(newsurl, anurag, errorHandler);

//
// imgurlforimgavtar = imgurlforimgavtar.replace(/"/g, "");
// Ti.API.info('NotWorkingUrl='+imgurlforimgavtar+'checkk');
// Ti.API.info('NotWorkingUrl chakresh and anurag working');
