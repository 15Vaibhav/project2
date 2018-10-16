var multer = require('multer');
const Post = require('../models/posts');
var Constant = require('../../common/constant');
var fs = require('fs');
var reply = {};

exports.ADD_POST_IMAGES = function(req,res){
    var dir = "../../var/www/html/Images";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var dir2 = "../../var/www/html/Images/userId";
    var directory;
    var directory2
    var postArray = [];
    var arrayIn = [];
    var arrayOut = [];

    var storage = multer.diskStorage({
        destination: function (req, files, callback) {
            directory2 = dir2.replace("userId",req.body.userId);
             if (!fs.existsSync(directory2)) {
               fs.mkdirSync(directory2);
             }
             
           directory = directory2.concat('/'+req.body.postId);
          if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory);
            }
           callback(null, directory);
        },
        filename: function (req, files, callback) {
            var name = files.fieldname + Date.now() + ".jpeg";
            var path = directory.concat("/" + name);
            var path2 = path.replace("../../var/www/html/Images", "");
            postArray.push(path2);
           callback(null, files.fieldname + Date.now() + ".jpeg");
        }
    });
    var upload = multer({storage: storage}).array('data');
    upload(req, res, function (err) {
               if (err) {
            
            reply[Constant.REPLY.MESSAGE] ="error";
            reply[Constant.REPLY.DATA] = "";
            reply[Constant.REPLY.RESULT_CODE] = "error";
            reply[Constant.REPLY.TOKEN] = '';
            return res.send(reply).end
        } else {
            for (var i = 0; i < postArray.length; i++) {
                UPDATE_POST_URL(res, req.body.postId, postArray, i, arrayIn, arrayOut);
            }
   
   
        }
   
    });
   
}
function UPDATE_POST_URL(res, postId, postArray, i, arrayIn, arrayOut) {
        Post.findOneAndUpdate({postId: postId}, {$push:{postImages: postArray[i]}}, function (err,post) {
      if (err) {
        console.log(err)
            arrayOut.push(postArray[i]);
            if (arrayOut.length == postArray.length) {
                console.log('uploaded');
                reply[Constant.REPLY.MESSAGE] = "uploaded";
                reply[Constant.REPLY.DATA] = arrayOut;
                reply[Constant.REPLY.RESULT_CODE] = "";
                reply[Constant.REPLY.TOKEN] = '';
                return res.send(reply).end;
            }
        } else {
            arrayIn.push(postArray[i]);
            if (arrayIn.length == postArray.length) {
                reply[Constant.REPLY.MESSAGE] = "partial uploaded";
                reply[Constant.REPLY.DATA] = post;
                reply[Constant.REPLY.RESULT_CODE] ="";
                reply[Constant.REPLY.TOKEN] = '';
                return res.send(reply).end;
                
            }
              }
           var tot = arrayIn.length + arrayOut.length;
        if (tot == postArray.length) {
            reply[Constant.REPLY.MESSAGE] ="uploaded";
            reply[Constant.REPLY.DATA] = post;
            reply[Constant.REPLY.RESULT_CODE] = "";
            reply[Constant.REPLY.TOKEN] = '';
            return res.send(reply).end;
           
        }
    })

};