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
var db = monk('sirivalli:sweety1234@ds155841.mlab.com:55841/register');

//up users-getting user
const users = db.get('users');
router.post('/', function(req, res, next) {
	if(req.body.firstname && req.body.lastname && req.body.emailid && req.body.password && req.body.userId){
	  	users.findOne({ '_id' : req.body.userId },function(e, doc){
            if(e){
                console.error(e.message);
                res.status(200).json({status:false, message: e.message, data : null});
            }else{
				users.update(
					{ '_id' : req.body.userId }, 
					{ $set: { 'firstname' : req.body.firstname, 'lastname': req.body.lastname, 'emailid':req.body.emailid, 'password':req.body.password} },
					function (e, doc) {
					if(e){
						res.status(200).json({status:false, message: e.message, data : null});
					}else{
						console.log(doc);
						if(doc.n == 1){
							res.status(200).json({status:true, message: doc.nModified+" documents updated.", data : doc});
						}else{
							res.status(200).json({status:false, message: 'Not updated', data : null});
						}    
					 }
				});
            }
	  });
	}else{
    	res.status(200).json({status:false, message: "Pease send required data", data : null});
	}
	});



module.exports = router;