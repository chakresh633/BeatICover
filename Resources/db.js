var DATABASE_NAME = 'newsbeats';

exports.createDb = function() {
	Ti.Database.install('newsbeats.sqlite', DATABASE_NAME);
	Ti.API.info('*******anurag****database is Created SuccessFully');
	var db = Ti.Database.open(DATABASE_NAME);
	
	var oneMoreSQL = "create table if not exists UserTable (Flag INTEGER, Name TEXT, Email TEXT, Mobile TEXT,Organization TEXT)";
	db.execute(oneMoreSQL);
	
	
	oneMoreSQL = "create table if not exists BeatTable (ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, beat_name TEXT, term_id INTEGER, status INTEGER)";
	db.execute(oneMoreSQL);
	
	db.close();
	//alert('SuccessFully installed database');
};



exports.selectBeats = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from BeatTable');
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('ID'), beat_name:rows.fieldByName('beat_name'),status:rows.fieldByName('status'),termid:rows.fieldByName('term_id')});
		Ti.API.info(rows.fieldByName('beat_name'));
		//
		rows.next();
	}
	db.close();
	return retData;
};
 
 exports.GetSelectedBeatsInPlusString=function(){
 	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from BeatTable');
	var beatUrl='';
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('ID'), beat_name:rows.fieldByName('beat_name'),status:rows.fieldByName('status'),termid:rows.fieldByName('term_id')});
		
		if(rows.fieldByName('status'))
	{
	
	var termids=rows.fieldByName('term_id');
	Ti.API.info('beatUrls='+termids);
	beatUrl=beatUrl+termids.toString()+'+';
	
	}
		
		rows.next();
	}
	var beatUrlss = beatUrl.substring(0,beatUrl.length-1);
	db.close();
 	
 	return beatUrlss;
 };

exports.getUserData=function(){
	var retData=[];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from UserTable');
	if(rows.rowCount==0)
	{
	return;
	}
	while (rows.isValidRow()) {
		retData.push({name:rows.fieldByName('Name'), email:rows.fieldByName('Email'),mobile:rows.fieldByName('Mobile'),org:rows.fieldByName('Organization')});
		rows.next();
	}
	db.close();
	
	
	return retData;
};
exports.GetFlag = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from UserTable');
	if(rows.rowCount==0)
	{
			retData.push({FLAG:0});
		Ti.API.info('row is valid');
	}
	else{
	while (rows.isValidRow()) {
		retData.push({FLAG:rows.fieldByName('Flag')});
		rows.next();
	}
	db.close();
	
	}
	
	Ti.API.info('Flag db='+retData);
	return (retData);
};

exports.UpdateUserInfo=function(e){
var mydb = Ti.Database.open(DATABASE_NAME);

	mydb.execute('UPDATE UserTable SET Name=? ,Email=?, Mobile=?, Organization=?',e.name,e.email,e.mobile,e.org);
	mydb.close();
	
};

exports.updateCheckStatus = function(e) { 
	var mydb = Ti.Database.open(DATABASE_NAME);
//	mydb.execute('update BeatTable set status = ? where ID = ?', e.id,e.status);
	mydb.execute('UPDATE BeatTable SET status=? WHERE ID=?',e.status,e.id);
//	var rows = mydb.execute('select * from todo where done = ?', _done);
	mydb.close();
	//alert('update sucessFully status='+e.status+"id="+e.id);
	//return rows;
};

exports.addItem = function(e) {
	//var mydb = Ti.Database.open(DATABASE_NAME);
	
	var db=Ti.Database.open(DATABASE_NAME);
	
	var oneMoreSQL = "create table if not exists BeatTable (ID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, beat_name TEXT, term_id INTEGER, status INTEGER)";
	db.execute(oneMoreSQL);
	var preSQL = "insert or ignore into BeatTable (ID,beat_name,term_id,status) values(NULL,' ";
	var postSQL = ")";
	db.execute(preSQL + e.beatname+"'," + e.termId+","+e.status + postSQL);

	Ti.API.info(preSQL + e.beatname+"'," + e.termId+","+e.status + postSQL);
	
	
	//mydb.execute('insert into BeatTable values (?,?,?)', beatname,termid,true);
	//mydb.close();
	db.close();
	Ti.API.info('*************anurag***************data is successFully inserted');
	//alert('successFully Inserted in beat table='+e.beatname+'=termId='+e.termid+'=status=true');
};


exports.SaveUserInformation = function(e) {
	//var mydb = Ti.Database.open(DATABASE_NAME);
	
	var db=Ti.Database.open(DATABASE_NAME);
	
	var oneMoreSQL = "create table if not exists UserTable (Flag INTEGER, Name TEXT, Email TEXT, Mobile TEXT,Organization TEXT)";
	db.execute(oneMoreSQL);
	var preSQL = "insert into UserTable (Flag,Name,Email,Mobile,Organization) values(1,' ";
	var postSQL = ")";
	db.execute(preSQL + e.name+"','" + e.email+"','" + e.mobile + "','"  +  e.organization +   "'" + postSQL);
	//db.execute('INSERT INTO UserTable(Flag,Name,Email,Mobile,Organization) VALUES (?,?,?,?,?)', e.flag,e.name,e.email,e.mobile, e.organization);
	Ti.API.info(preSQL + e.name+"','" + e.email+"','" + e.mobile + "','"  +  e.organization +   "'" + postSQL);
	
	
	//mydb.execute('insert into BeatTable values (?,?,?)', beatname,termid,true);
	db.close();
	
	Ti.API.info('*************anurag*************** User data is successFully inserted');
	//alert('successFully Inserted in userTable');
};



// 
// exports.deleteItem = function(_id) {
	// var mydb = Ti.Database.open(DATABASE_NAME);
	// mydb.execute('delete from todo where ROWID = ?', _id);
	// mydb.close();
// };