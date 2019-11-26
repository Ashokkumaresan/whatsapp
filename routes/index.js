var express=require('express');
var cors = require('cors')
var bodyParser=require('body-parser');
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var router=express.Router();
var mongo=require('mongodb');
var ObjectID = require('mongodb').ObjectID;
router.use(cors())
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({secret: "hotshot"}));
path.basename('/');
/*Start Login service*/
var url='mongodb+srv://ashokkumaresan:Godfather@321@cluster0-rzsic.mongodb.net/test?retryWrites=true&w=majority'
router.get('/api/login',function(req,res){

	var query=req.body;
	console.log("input",req.body);
	MongoClient=mongo.MongoClient;
	//var url='mongodb://localhost/SA';mongodb+srv://ashokkumaresan:Godfather@321@cluster0-rzsic.mongodb.net/test?retryWrites=true&w=majority
	
	MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			console.log('connected');
			var db = client.db('whatsapp7');
			//console.log(db);
			//var collection=db.collection("login");
			db.collection('login').findOne({username:query.username,password:query.password}, function (findErr, result) {
				if (findErr) throw findErr;
				console.log(result);
				if(result)
				 res.json(result);
				else
					res.json({error:"Invalid User name or password"}); 
				client.close();
			  });
			
		} 	
	});
});

router.get('/api/contacts',function(req,res){

	var query=req.body;
	console.log("input",req.body);
	MongoClient=mongo.MongoClient;
	//var url='mongodb://localhost/SA';
	
	MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			console.log('connected');
			var db = client.db('whatsapp7');
			//console.log(db);
			//var collection=db.collection("login");
			db.collection('contacts').find({}).toArray(function (findErr, result) {
				if (findErr) throw findErr;
				console.log(result);
				if(result)
				 res.json(result);
				else
				res.json({error:"Invalid Request"}); 
				client.close();
			  });
			
		} 	
	});
});

router.get('/api/template',function(req,res){

	var query=req.body;
	console.log("input",req.body);
	MongoClient=mongo.MongoClient;
	//var url='mongodb://localhost/SA';
	
	MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			console.log('connected');
			var db = client.db('whatsapp7');
			//console.log(db);
			//var collection=db.collection("login");
			db.collection('template').find({}).toArray(function (findErr, result) {
				if (findErr) throw findErr;
				console.log(result);
				if(result)
				 res.json(result);
				else
				res.json({error:"Invalid Request"}); 
				client.close();
			  });
			
		} 	
	});
});

router.post('/api/contacts',function(req,res){
	console.log("In Post");
var query=req.body;
	console.log("input",req.body);
	MongoClient=mongo.MongoClient;
	//var url='mongodb://localhost/SA';
	
	MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			console.log('connected');
			var db = client.db('whatsapp7');
			//console.log(db);
			//var collection=db.collection("login");
			delete query.id;
			delete query._id;
			db.collection('contacts').insert(query, function (findErr, result) {
				if (findErr) throw findErr;
				console.log(result);
				if(result)
				 res.json("Success");
				else
				res.json({error:"Invalid Request"}); 
				client.close();
			  });
			
		} 	
	});
});

router.post('/api/template',function(req,res){
	console.log("In Post");
var query=req.body;
	console.log("input",req.body);
	MongoClient=mongo.MongoClient;
	//var url='mongodb://localhost/SA';

	MongoClient.connect(url,{ useNewUrlParser: true },function(err,client){
		if(err){
			console.log("Error in connecting database");
		}
		else{
			console.log('connected');
			var db = client.db('whatsapp7');
			//console.log(db);
			//var collection=db.collection("login");
			delete query.id;
			delete query._id;
			db.collection('template').insert(query, function (findErr, result) {
				if (findErr) throw findErr;
				console.log(result);
				if(result)
				 res.json("Success");
				else
				res.json({error:"Invalid Request"}); 
				client.close();
			  });
			
		} 	
	});
});


router.put('/api/contacts',function(req,res){
	console.log("In Put");
var query=req.body;
console.log(query);
MongoClient=mongo.MongoClient;

MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true } ,function(err,client){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var db = client.db('whatsapp7');
	//console.log(db);
	//var collection=db.collection("login");
	db.collection('contacts').updateOne({_id:ObjectID(query._id)},{$set:{'name':query.name,'emailid':query.emailid,'phone':query.phone}}, function (findErr, result) {
		if (findErr) throw findErr;
		console.log(result);
		if(result)
		 res.json("Success");
		else
		res.json({error:"Invalid Request"}); 
		client.close();
	  });
}
});
});

router.delete('/api/contacts',function(req,res){
	console.log("In Put");
var query=req.body;
console.log(query);
MongoClient=mongo.MongoClient;

MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true } ,function(err,client){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var db = client.db('whatsapp7');
	//console.log(db);
	//var collection=db.collection("login");
	db.collection('contacts').remove({_id:ObjectID(query._id)}, function (findErr, result) {
		if (findErr) throw findErr;
		console.log(result);
		if(result)
		 res.json("Success");
		else
		res.json({error:"Invalid Request"}); 
		client.close();
	  });
}
});
});

router.put('/api/template',function(req,res){
	console.log("In Put");
var query=req.body;
console.log(query);
MongoClient=mongo.MongoClient;

MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true } ,function(err,client){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var db = client.db('whatsapp7');
	//console.log(db);
	//var collection=db.collection("login");
	db.collection('template').updateOne({_id:ObjectID(query._id)},{$set:{'title':query.title,'message':query.message}}, function (findErr, result) {
		if (findErr) throw findErr;
		console.log(result);
		if(result)
		 res.json("Success");
		else
		res.json({error:"Invalid Request"}); 
		client.close();
	  });
}
});
});

router.delete('/api/template',function(req,res){
	console.log("In Put");
var query=req.body;
console.log(query);
MongoClient=mongo.MongoClient;

MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true } ,function(err,client){
if(err){
	console.log("Error is getting data "+err);
}
else{
	var db = client.db('whatsapp7');
	//console.log(db);
	//var collection=db.collection("login");
	db.collection('template').remove({_id:ObjectID(query._id)}, function (findErr, result) {
		if (findErr) throw findErr;
		console.log(result);
		if(result)
		 res.json("Success");
		else
		res.json({error:"Invalid Request"}); 
		client.close();
	  });
}
});
});


/*End Dairy service*/
module.exports=router;
