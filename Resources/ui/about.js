//exports.aboutData=function()
//{
var win = Ti.UI.createWindow({

});

var progressIndicator = Ti.UI.Android.createProgressIndicator({
    message : 'Loading...',
    location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
    type : Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT,
    cancelable : false,

});

success = function(response) {

    //	var tableData = [];
    var title = "About Us";
    var desc = 'Continuing with the tradition of offering new and landmark services, Perfect Relations has launched its first application “Beat I cover”. This application is designed to keep Media & Consumers posted on all the latest news and updates related to their preferred industries Application includes latest industry news, press releases, top influencers & events which are happening within a radius of 50 Kms from your current location.';
    if (response != null) {
        if (response[0] != null && response[0].node_title.length != 0)
            title = response[0].node_title;

        //var desc = response[0].Body;
        if (response[0] != null && response[0].Body.length != 0)
            desc = response[0].Body;
    }
    var AboutView = Ti.UI.createView({
        backgroundColor : "white",
        layout:"vertical"
    });
    var description = Ti.UI.createLabel({
        font : {
            fontFamily : 'Arial'
        },
        text : desc,
        top:0,
        left:10,
        right:10,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,
        color:"black"

    });

    var scrollView = Ti.UI.createScrollView({
        contentWidth : 'auto',
        contentHeight : 'auto',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : true,
        height : '100%',
        width : '100%',
        top : 10
    });

    scrollView.add(description);
    var aboutTitle = Ti.UI.createLabel({
        font : {
            fontFamily : 'Arial',
            fontWeight:"bold"
        },
        text : title,
        top : 10,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE,
        left:10,
        color:"black"
    });
    AboutView.add(aboutTitle);
    AboutView.add(scrollView);
    //.................important issue come here unkonwn winow open if not specify current window
    var win = Ti.UI.currentWindow;
    win.add(AboutView);
    win.open();
    //animate back to center

    progressIndicator.hide();
};

//.........................................................................................
//drawer.toggleLeftWindow();http://immservices.in/mediatech/
var urlnews = "http://immservices.in/mediatech/?q=api/aboutus";
Ti.API.info('Aboutus= urlnewsFinal=' + urlnews);
progressIndicator.show();

errorHandler = function(err) {
    var title = "About Us";

    var desc = 'Continuing with the tradition of offering new and landmark services, Perfect Relations has launched its first application “Beat I cover”. This application is designed to keep Media & Consumers posted on all the latest news and updates related to their preferred industries Application includes latest industry news, press releases, top influencers & events which are happening within a radius of 50 Kms from your current location.';


    var AboutView = Ti.UI.createView({
        backgroundColor : "white"
    });
    var description = Ti.UI.createLabel({
        font : {
            fontFamily : 'Arial'
        },
        text : desc,
        top:7,
        width : Ti.UI.SIZE,
        height : Ti.UI.SIZE,

    });

    var scrollView = Ti.UI.createScrollView({
        contentWidth : 'auto',
        contentHeight : 'auto',
        showVerticalScrollIndicator : true,
        showHorizontalScrollIndicator : true,
        height : '50%',
        width : '100%',
        top : 10,
        left : 10
    });

    scrollView.add(description);
    var aboutTitle = Ti.UI.createLabel({
        font : {
            fontFamily : 'Arial'
        },
        text : title,
        top : 10,
        left:10,
        width : Ti.UI.FILL,
        height : Ti.UI.SIZE
    });
    AboutView.add(aboutTitle);
    AboutView.add(scrollView);
    //.................important issue come here unkonwn winow open if not specify current window
    var win = Ti.UI.currentWindow;
    win.add(AboutView);
    win.open();
    //animate back to center

    progressIndicator.hide();

};

require('news').mybeats(urlnews, success, errorHandler);

Ti.App.addEventListener('closeWinAnurag', function(e) {
    win.close();
});

Ti.App.fireEvent('closeWinAnurag');

//};