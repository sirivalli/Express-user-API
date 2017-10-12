var express = require('express');
var router = express.Router();
var md5 = require('md5');
var _ = require('underscore');
var async = require("async");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    /*auth: {
        user: 'info.keystonebooks@gmail.com',
        pass: 'keystone@123'
    }*/
    auth: {
        user: 'nag6911@gmail.com',
        pass: 'nagesh@123'
    }
});
// var fromEmailId = 'nag6911@gmail.com';  // from email for all mails 
// var fromName = 'SIRIVALLI-VALLURUPALLI'; 

require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" } );
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}


//forgot password

router.post('/', function(req, res){
     var db = req.db;
    const users = db.get('users');
    if( req.body.emailid){
        var emailid = req.body.emailid;
        var password =req.body.password;
        var tempPassword = Math.floor(1000 + Math.random() * 9000);
        var fromEmailId = 'nag6911@gmail.com';
        var fromName = 'SIRIVALLI-VALLURUPALLI';
        var mailOptions = {
            from: '"'+fromName+'" <'+fromEmailId+'>', // sender address
            to: emailid, // list of receivers
            subject: fromName+' | Forgot Password', // Subject line
            //text: 'Hello world 🐴', // plaintext body
            html: 'Your new password is <h3>'+tempPassword+'</h3>' // html body
        };

        var query = { 'emailid' : emailid};
        users.findOne(query,function(e, doc){
            if(e){
                console.log(1);
                return res.status(200).json({status:false, message: 'Error', data : null});
            }else{
              console.log(doc.emailid);
              console.log(emailid);
                if(doc.emailid == emailid){
                    req.transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error.message);
                            res.status(200).json({status:false, message: 'Email not sent', data : null});
                        }else{
                            // console.log(typeof tempPassword);
                            // console.log(md5(tempPassword));
                            users.update(
                           
                                { 'emailid' : emailid }, 
                                { $set: {'password': md5(tempPassword.toString())} },
                                function (e, doc) {
                                if(e){
                                    console.log(e.message);
                                    res.status(200).json({status:false, message: e.message, data : null});
                                }else{
                                    if(doc.n == 1){
                                        res.status(200).json({status:true, message: "Please check your email Id", data : doc});
                                    }else{
                                        console.log('User not found');
                                        res.status(200).json({status:false, message: 'No user found.', data : null});
                                    }   
                                }
                            });
                        }
                    });
                }    
            }
            //     console.log(doc); 
            //      req.transporter.sendMail(mailOptions, function(error, info){
            //             if(error){
            //                 console.log(error.message);
            //                 return res.status(200).json({status:false, message: 'Email not sent', data : null});
            //             }else{
            //                 console.log(tempPassword);
            //             }
            //         });
            // }
       //      if(e){
       //          res.status(200).json({status:false, message: 'No user found11', data : null});
       //          return
       //      }else{
       //          console.log(doc);
       //          if(doc.emailid == emailid){
       //              req.transporter.sendMail(mailOptions, function(error, info){
       //                  if(error){
							// console.log(error.message);
       //                      return res.status(200).json({status:false, message: 'Email not sent', data : null});
       //                  }else{
							// console.log(tempPassword);
						 //      console.log(md5(tempPassword));
       //                      users.update(
       //                          { 'emailid' : emailid }, 
       //                          { $set: {'tempPassword': md5(tempPassword.toString())} },
       //                          function (e, doc) {
       //                          if(e){
							// 		console.log(e.message);
       //                              res.status(200).json({status:false, message: e.message, data : null});
       //                          }else{
       //                              if(doc.n == 1){
       //                                  res.status(200).json({status:true, message: "Please check your email Id", data : doc});
       //                              }else{
							// 			console.log('User not found');
       //                                  res.status(200).json({status:false, message: 'No user found.', data : null});
       //                              }   
       //                          }
       //                      });
       //                  }
       //              });
       //          }    
       //      }
        });
       
    }else{
        res.status(200).json({status:false, message: "Please send required data", data : null});
    }
});
module.exports = router;
