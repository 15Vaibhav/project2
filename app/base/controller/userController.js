var User = require('../models/user')
var Constant = require('../../common/constant');
var reply ={}

exports.CREATE_USER = function(req,res){
    console.log("CREATE_USER CALL");
    var str = 'U';
    var d = str.concat(Date.now());
    var user = new User({
        userId:d,
        profileType:req.body.profileType,
        phoneNumber:req.body.phoneNumber,
        lastUpdatedDateTime:req.body.lastUpdatedDateTime,
        userRegistrationDateTime:req.body.userRegistrationDateTime,
        userName:req.body.userName, 
        })
    user.save({},(err,user)=>{
    if(!err){
        // reply[Constant.REPLY.MESSAGE] ='user created successfully';
        // reply[Constant.REPLY.DATA] = user;
        // reply[Constant.REPLY.RESULT_CODE] = 200;
        // reply[Constant.REPLY.TOKEN] = '';
        return res.send(user).end  
    }else{
        console.log(err);
        reply[Constant.REPLY.MESSAGE] ="something went wrong";
        reply[Constant.REPLY.DATA] = "";
        reply[Constant.REPLY.RESULT_CODE] = "error";
        // reply[Constant.REPLY.TOKEN] = '';
        return res.send(reply).end  
    }
    })
}
exports.UPDATE_USER = function(req,res){
    console.log(req.body.userId);
         User.findOneAndUpdate({userId:req.body.userId},
            {$set:{
        userName:req.body.userName, 
        profileType:req.body.profileType,
        phoneNumber:req.body.phoneNumber,
        lastUpdatedDateTime:req.body.lastUpdatedDateTime,
        name:req.body.name,
        emailId:req.body.emailId,
        organisationName:req.body.organisationName,
        designation:req.body.designation,
        gender:req.body.gender,
        aboutMe:req.body.aboutMe,
        dateOfBirth:req.body.dateOfBirth,
        personalEmailId:req.body.personalEmailId,
        personalAddress:req.body.personalAddress,
        personalPhoneNumber:req.body.personalPhoneNumber, 
        numberOfPost :req.body.numberOfPost,
        // followers:req.body.followers,
        // following:req.body.following,
        rating:req.body.rating,
        userDescription:req.body.userDescription
                  }
        },(err,user)=>{
            if(!err){
                reply[Constant.REPLY.MESSAGE] ='profile updated successfully';
                reply[Constant.REPLY.DATA] = user;
                reply[Constant.REPLY.RESULT_CODE] = 200;
                reply[Constant.REPLY.TOKEN] = '';
                return res.send(reply).end  
            }else{
                console.log(err);
                reply[Constant.REPLY.MESSAGE] ="something went wrong";
                reply[Constant.REPLY.DATA] = "";
                reply[Constant.REPLY.RESULT_CODE] = 403;
                reply[Constant.REPLY.TOKEN] = '';
                return res.send(reply).end  
            }
        })
        
}