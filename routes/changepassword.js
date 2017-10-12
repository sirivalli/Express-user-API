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


//change password
const users = db.get('users');



router.post('/', function(req, res){
    if(req.body.emailid &&req.body.password){

        var emailid = req.body.emailid;
        var password = md5(req.body.password);
        var details = {
        	'newpassword' : req.body.newpassword,
        	'conformpassword' : req.body.conformpassword
        }
        var query = { 'emailid' : emailid};
        users.findOne(query,function(e, doc){
            if(e){
                console.error(e.message);
                res.status(200).json({status:false, message: e.message, data : null});
            }else{
                if(doc){
					// console.log(typeof password);
					// console.log(md5(password));
					// console.log(doc);
                    if(md5(doc.password) == md5(password) ){
                    	if(details.newpassword == details.conformpassword)
                    	{
                    		users.update(
								{ 'emailid' : req.body.emailid }, 
								{ $set: { 'password' : md5(req.body.newpassword) } },
								function (e, doc) {
								if(e){
								res.status(200).json({status:false, message: e.message, data : null});
								}else{
								console.log(doc);
								if(doc.n == 1){
								res.status(200).json({status:true, message: " Password changes successfully.", data : doc});
								}else{
								res.status(200).json({status:false, message: 'password dosent match', data : null});
						}    
					 }
				});

                    }
                        
                    }
                
                    else {
                        res.status(200).json({status:false, message: "Check your old password", data : null});
                    }
                }
            }
        });
    }else{
        res.status(200).json({status:false, message: "Please send required data", data : null});
    }
});
module.exports = router;


				