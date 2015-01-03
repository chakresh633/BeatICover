var win = Ti.UI.createWindow();
win.orientationModes=[Titanium.UI.PORTRAIT,Titanium.UI.PORTRAIT];

exports.getDisplayName = function(string)
{
	//var string1 = decodeURIComponent(string);
	//Ti.API.info("***chakresh string1 = " + string1 + " string is " + string);
	if(string == "F&amp;B")
		string = "F&B";
	if(string == "news")
		string = "News";
	if(string == "events")
		string = "Events";
	if(string == "press_release")
		string = "Press Release";
	return string;			
};

exports.mybeats=function(urltocall,success, error){
	var responses=[];
	//var url = "http://themarketech.in/mediatech/?q=api/allbeats";
 
 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
     	var response=JSON.parse(this.responseText);
     	//alert('response_l='+response.length+"=this.responseText="+this.responseText.length);
     	success(response);

     	
     	
        // Ti.API.info("Received text: " + this.responseText);
         //alert('success='+response);
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
         error(e.error);
     },
     timeout : 150000  /* in milliseconds */
 });


 // Prepare the connection.
 // This accepts PUT/DELETE/GET/POST
 client.open("GET", urltocall);
 // Send the request.
 client.send();
 
 responses.push({id:123,name:'anurag'});
 
return responses;

	
};
