var express = require('express');
var router = express.Router();
var md5 = require('md5');
var _ = require('underscore');
var async = require("async");
require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" } );
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

// MongoDB 
var mongo = require('mongodb');
var monk = require('monk');
//var db = monk('sirivalli123:sweety1234@ds147421.mlab.com:47421/bookstoredb');
var db = monk('sirivalli:sweety1234@ds155841.mlab.com:55841/register');
//var db = monk('sirivalli:sweety1234@ds123361.mlab.com:23361/feedback1');

//registering new users-inserting user
const users = db.get('users');
// router.post('/', function(req, res, next) {
// 	//if(req.body.firstname && req.body.lastname && req.body.emailid && req.body.password){
// 		if(req.body.firstname ){
// 	  	var userDetails = {
//          'firstname': req.body.firstname
// 		 // 'lastname': req.body.lastname,
// 		 // 'emailid':req.body.emailid,
// 		 // 'password':req.body.password
//        	};
// 	    users.insert(userDetails, function (err, doc) {
//             if (err) {
//                 console.error(err);
//                 res.status(200).json({status:false, message: "Unable to insert into database", data : null});
//             }else {
//                 res.status(200).json({status:true, message: "User added successfully", data : doc});
// 			}	//next();
// 		});
// 	}else{
//     	res.status(200).json({status:false, message: "Pease send required data", data : null});
// 	}
// 	//console.log(docs);
// //res.status(200).json({'data': db});
// });
router.post('/', function(req, res, next) {
	if(req.body.firstname && req.body.lastname && req.body.emailid && req.body.password){
	  	var userDetails = {
         'firstname': req.body.firstname,
		 'lastname': req.body.lastname,
		 'emailid':req.body.emailid,
		 'password':md5(req.body.password),
		 'tempPassword' : ''

//        	};
       	};
	    users.insert(userDetails, function (err, doc) {
            if (err) {
                console.error(err);
                res.status(200).json({status:false, message: "Unable to insert into database", data : null});
            }else {
                res.status(200).json({status:true, message: "User added successfully", data : doc});
			}	//next();
		});
	}else{
    	res.status(200).json({status:false, message: "Pease send required data", data : null});
	}
	//console.log(docs);
//res.status(200).json({'data': db});
});
module.exports = router;