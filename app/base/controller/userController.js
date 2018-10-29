var User = require("../models/user");
var Constant = require("../../common/constant");
var reply = {};

exports.CREATE_USER = function(req, res) {
  console.log("CREATE_USER CALL");
  var str = "U";
  var d = str.concat(Date.now());
  var user = new User({
    userId: d,
    profileType: req.body.profileType,
    phoneNumber: req.body.phoneNumber,
    lastUpdatedDateTime: req.body.lastUpdatedDateTime,
    userRegistrationDateTime: req.body.userRegistrationDateTime,
    userName: req.body.userName
  });
  user.save({}, (err, user) => {
    if (!err) {
      // reply[Constant.REPLY.MESSAGE] ='user created successfully';
      // reply[Constant.REPLY.DATA] = user;
      // reply[Constant.REPLY.RESULT_CODE] = 200;
      // reply[Constant.REPLY.TOKEN] = '';
      return res.send(user).end;
    } else {
      console.log(err);
      // reply[Constant.REPLY.MESSAGE] ="something went wrong";
      // reply[Constant.REPLY.DATA] = "";
      // reply[Constant.REPLY.RESULT_CODE] = "error";
      // reply[Constant.REPLY.TOKEN] = '';
      return res.send(err).end;
    }
  });
};

exports.DO_FOLLOW = async function(req, res) {
    console.log("DO_FOLLOW call");
    var xName;
    new Promise (function(resolve, reject){
        var x = User.findOne( {userId : req.body.x},
        function(err, result){
            if (result) {
                console.log("x found in db");
                xName = result.userName;
                xId = result.userId;
                xImage = result.profileImage;
                console.log(xName);
             } else {
                 console.log(err);
                 return res.send(err).end;
             }
         });
         resolve(x);
    }).then(function(result){
        new Promise (function(resolve, reject){
            var y = User.findOneAndUpdate(
                    {userId: req.body.y},
                    {$pull: {followersList: {userId: xId}}},
                    (err, user) => {
                        if (err) {
                            return res.send(err).end;
                        }
                    });
            resolve(y);
        }).then(function(result){
            try {
            User.findOneAndUpdate(
            {userId: req.body.y},
            {$push: { followersList: {userId: xId, userName: xName, profileImage:xImage}}}, 
            { returnNewDocument: true },
            (err, user) => {
                if (user) {
                    reply[Constant.REPLY.MESSAGE] = "follower added successfully";
                    reply[Constant.REPLY.DATA] = user;
                    reply[Constant.REPLY.RESULT_CODE] = 200;
                    reply[Constant.REPLY.TOKEN] = "";
                    return res.send(reply).end;
                } else {
                    console.log(err);
                    return res.send(err).end;
                }
            });
            }
            catch(e) {
            }
            return result;
        })
        return result;
    })
};

exports.UPDATE_USER = function(req, res) {
  console.log("update profile call");
  var fallowers = JSON.stringify(req.body.fallowers);
  User.findOneAndUpdate(
    { userId: req.body.userId },
    {
      $set: {
        userName: req.body.userName,
        profileType: req.body.profileType,
        phoneNumber: req.body.phoneNumber,
        lastUpdatedDateTime: req.body.lastUpdatedDateTime,
        name: req.body.name,
        emailId: req.body.emailId,
        organisationName: req.body.organisationName,
        designation: req.body.designation,
        gender: req.body.gender,
        aboutMe: req.body.aboutMe,
        dateOfBirth: req.body.dateOfBirth,
        personalEmailId: req.body.personalEmailId,
        personalAddress: req.body.personalAddress,
        personalPhoneNumber: req.body.personalPhoneNumber,
        numberOfPost: req.body.numberOfPost,
        followers: req.body.followers,
        // following:req.body.following,
        rating: req.body.rating,
        userDescription: req.body.userDescription
      }
    },
    { returnNewDocument: true },
    (err, user) => {
      if (user) {
        reply[Constant.REPLY.MESSAGE] = "profile updated successfully";
        reply[Constant.REPLY.DATA] = user;
        reply[Constant.REPLY.RESULT_CODE] = 200;
        reply[Constant.REPLY.TOKEN] = "";
        return res.send(reply).end;
      } else {
        console.log(err);
        reply[Constant.REPLY.MESSAGE] = "something went wrong";
        reply[Constant.REPLY.DATA] = "";
        reply[Constant.REPLY.RESULT_CODE] = 403;
        reply[Constant.REPLY.TOKEN] = "";
        return res.send(reply).end;
      }
    }
  );
};
