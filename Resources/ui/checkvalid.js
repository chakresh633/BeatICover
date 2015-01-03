exports.checkemail=function(emailAddress){
	var go;
    var str = emailAddress;
    Ti.API.info(str);
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (filter.test(str))
    {
    // alert('valid');
     go=true;
    }
    else
    {
       // alert('email not valid');
        go=false;
    }
 return (go);
};

exports.checkContact=function(inputtxt){
	var goe;
	var phoneno = /^\d{10}$/;
	if(inputtxt.match(phoneno))
	{
		goe=true;
		
	}else{
		goe=false;
		//alert('Number not valid');
	}
	return (goe);
};