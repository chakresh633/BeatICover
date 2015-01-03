var activity = Ti.Android.currentActivity;
var win =Ti.UI.createWindow({
	
	backgroundColor:'white'
}); 

var intent=Ti.Android.currentActivity.getIntent();
//var name=intent.getStringExtra("name");
//var parseString=JSON.parse(name);
//var anurag=parseString.name;
var win = Ti.UI.currentWindow;

var launchButton = Ti.UI.createButton(
{
	top: 10, width: 200, title: 'anurag'
});

win.add(launchButton);


win.open();
