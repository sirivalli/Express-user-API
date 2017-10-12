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

//login new users-getting user
const users = db.get('users');
router.post('/', function(req, res){
    if( req.body.emailid && req.body.password){
        var emailid = req.body.emailid;
        var password = req.body.password;
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
                    if(doc.password == md5(password) ){
                        res.status(200).json({status:true, message: "Successfully loggedin", data : doc});
                    }
                
                    else {
                        res.status(200).json({status:false, message: "Check your password", data : null});
                    }
                }else{
                    res.status(200).json({status:false, message: "No user found", data : null});
                }
            }
        });
    }else{
        res.status(200).json({status:false, message: "Please send required data", data : null});
    }
});
module.exports = router;
// else if(doc.tempPassword == md5(password)){
                    //     var userDetails = doc;
                    //     users.update(
                    //         { 'emailid' : emailid}, 
                    //         { $set: {'password': doc.tempPassword} },

                    //         function (e, doc) {
                    //         if(e){
                    //             res.status(200).json({status:false, message: e.message, data : null});
                    //         }else{
                    //             if(doc.n == 1){
                    //                 res.status(200).json({status:true, message: "Successfully loggedin", data : userDetails});
                    //             }else{
                    //                 res.status(200).json({status:false, message: 'Not updated', data : null});
                    //             }    
                    //         }
                    //     });
                    // }