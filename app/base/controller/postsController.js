var Posts = require('../models/posts');
var Constant = require('../../common/constant');
var User = require('../models/user');
var reply = {};

exports.ADD_POSTS = function (req, res) {
    console.log('add_post...........');
    var str = "P";
    var d = str.concat(Date.now());
    var posts = new Posts({
        postId: d,
        userId: req.body.userId,
        postsCaption: req.body.postsCaption,
        fullPost: req.body.fullPost,
        tags: req.body.tags,
        time: req.body.time,
        create_date: req.body.create_date,
        update_date: req.body.update_date,
        mediaType: req.body.mediaType,
        address :req.body.address,
    })
    posts.save({}, function (err, result) {
        if (err) {
            console.log(err);
        } 
        else {
           console.log(result.userId);
           User.findOne({userId:result.userId},function(err,users){
        //    console.log(users);
            user ={
               userId : req.body.userId,
               postId : result.postId,
               postsCaption:result.postsCaption,
               fullPost:result.fullPost,
               tags:result.tags,
               time:result.time,
               create_date: result.create_date,
               update_date: result.update_date,
               mediaType: result.mediaType,
               address :result.address,
               userDetails:users,
            }
            reply[Constant.REPLY.MESSAGE] = "POST_CREATED";
            reply[Constant.REPLY.DATA] = user;
            reply[Constant.REPLY.RESULT_CODE] = 200;
            reply[Constant.REPLY.TOKEN] = '';
            return res.send(reply).end;

           })   
           }
                  
            })
        }
  exports.GET_POST = function(req,res){
      Posts.find({},(err,posts)=>{
          if(err){
              console.log(err);
            reply[Constant.REPLY.MESSAGE] ="error";
            reply[Constant.REPLY.DATA] = "";
            reply[Constant.REPLY.RESULT_CODE] = "error";
            reply[Constant.REPLY.TOKEN] = '';
            return res.send(reply).end  
               
           }else{
            reply[Constant.REPLY.MESSAGE] ="all posts";
            reply[Constant.REPLY.DATA] = posts;
            reply[Constant.REPLY.RESULT_CODE] = 200;
            reply[Constant.REPLY.TOKEN] = '';
            return res.send(reply).end  

          }

      })

  }

