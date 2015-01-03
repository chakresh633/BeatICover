var intent = Ti.Android.createIntent({
    flags : Ti.Android.FLAG_ACTIVITY_CLEAR_TOP | Ti.Android.FLAG_ACTIVITY_NEW_TASK,
    //here paste your app id and activityName like this code
className:'com.micrasystem.newsbeat.anurag.NotiActivity'
   
});
intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
  
var pending = Titanium.Android.createPendingIntent({
    intent: intent,
    flags: Titanium.Android.FLAG_UPDATE_CURRENT
});


errorHandler = function(err) 
 {
 	//progressIndicator.hide();
 	alert("Please Check Your DATA Connnection");
 };

EventsDataFetchingFunctions=function(response){
Ti.API.info('ProbResponse=******='+JSON.stringify(response));

var str='';
if(response[0].news)
{
	str=str+''+response[0].news;
	
}
if(response[0].events)
{
	str=str+' '+response[0].events;	
}
if(response[0].pressrelease)
{
		str=str+' '+response[0].pressrelease;
	
}

 // create a random id
var nId = parseInt(10000 * Math.random());
  
// Create the notification
var notification = Titanium.Android.createNotification({
    contentTitle: 'News beat',
    contentText : str,
    contentIntent: pending,
   	icon: Ti.App.Android.R.drawable.appicon,
});
  
// Send the notification.
Ti.Android.NotificationManager.notify(nId, notification);  

};
    
   // var dateCurr = new Date();
   // if(dateCurr.getHours() == 8)
   // {
    
		var beatUrlss = require('db').GetSelectedBeatsInPlusString();
		
		Ti.API.info('*********BEAT APPEND URL='+beatUrlss);
	
		var anuUrl='http://immservices.in/mediatech/ajaxCalls.php?alertmsg='+beatUrlss;
		Ti.API.info('anu url='+anuUrl);
		require('news').mybeats(anuUrl,EventsDataFetchingFunctions, errorHandler);
	
	//}
	
