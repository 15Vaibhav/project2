var multer = require("multer");
const Post = require("../models/posts");
const User = require("../models/user");
var Constant = require("../../common/constant");
var fs = require("fs");
var reply = {};

exports.ADD_POST_IMAGES = function(req, res) {
  // console.log("1.." + req.body.userId);
  var dir = "../../var/www/html/Images";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var dir2 = "../../var/www/html/Images/userId";
  var directory;
  var directory2;
  var postArray = [];
  var arrayIn = [];
  var arrayOut = [];

  var storage = multer.diskStorage({
    destination: function(req, files, callback) {
      console.log("2.." + req.body.userId);
      directory2 = dir2.replace("userId", req.body.userId);
      if (!fs.existsSync(directory2)) {
        fs.mkdirSync(directory2);
      }

      directory = directory2.concat("/" + req.body.postId);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      callback(null, directory);
    },
    filename: function(req, files, callback) {
      var name = files.fieldname + Date.now() + ".jpeg";
      var path = directory.concat("/" + name);
      var path2 = path.replace("../../var/www/html/Images", "");
      postArray.push(" http://206.189.131.198:8081/" + path2);
      callback(null, files.fieldname + Date.now() + ".jpeg");
    }
  });
  var upload = multer({ storage: storage }).array("data");
  upload(req, res, function(err) {
    console.log("3.." + req.body.userId);
    if (err) {
      reply[Constant.REPLY.MESSAGE] = "error";
      reply[Constant.REPLY.DATA] = "";
      reply[Constant.REPLY.RESULT_CODE] = "error";
      reply[Constant.REPLY.TOKEN] = "";
      return res.send(reply).end;
    } else {
      for (var i = 0; i < postArray.length; i++) {
        UPDATE_POST_URL(res, req.body.postId, postArray, i, arrayIn, arrayOut);
      }
    }
  });
};
function UPDATE_POST_URL(res, postId, postArray, i, arrayIn, arrayOut) {
  Post.findOneAndUpdate(
    { postId: postId },
    { $push: { postImages: postArray[i] } },
    function(err, post) {
      if (err) {
        console.log(err);
        arrayOut.push(postArray[i]);
        if (arrayOut.length == postArray.length) {
          console.log("uploaded");
          reply[Constant.REPLY.MESSAGE] = "uploaded";
          reply[Constant.REPLY.DATA] = arrayOut;
          reply[Constant.REPLY.RESULT_CODE] = "";
          reply[Constant.REPLY.TOKEN] = "";
          return res.send(reply).end;
        }
      } else {
        arrayIn.push(postArray[i]);
        if (arrayIn.length == postArray.length) {
          reply[Constant.REPLY.MESSAGE] = "partial uploaded";
          reply[Constant.REPLY.DATA] = post;
          reply[Constant.REPLY.RESULT_CODE] = "";
          reply[Constant.REPLY.TOKEN] = "";
          return res.send(reply).end;
        }
      }
      var tot = arrayIn.length + arrayOut.length;
      if (tot == postArray.length) {
        reply[Constant.REPLY.MESSAGE] = "uploaded";
        reply[Constant.REPLY.DATA] = post;
        reply[Constant.REPLY.RESULT_CODE] = "";
        reply[Constant.REPLY.TOKEN] = "";
        return res.send(reply).end;
      }
    }
  );
}
exports.UPDATE_PROFILE_IMAGE = function(req, res) {
  console.log("update call..");
  var dir = "../../var/www/html/Images";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  var dir2 = "../../var/www/html/Images/userId";
  var directory;
  var directory2;
  var path2;
  var postArray = [];
  var arrayIn = [];
  var arrayOut = [];

  var storage = multer.diskStorage({
    destination: function(req, files, callback) {
      console.log("2.." + req.body.userId);
      directory2 = dir2.replace("userId", req.body.userId);
      if (!fs.existsSync(directory2)) {
        fs.mkdirSync(directory2);
      }

      directory = directory2.concat("/profile");
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }
      callback(null, directory);
    },
    filename: function(req, files, callback) {
      var name = req.body.userName + ".jpeg";
      var path = directory.concat("/" + name);
      console.log("path..." + path);
      var path3 = path.replace("../../var/www/html/Images", "");
      path2 = " http://206.189.131.198:8081/".concat(path3);

      // postArray.push(" http://206.189.131.198:8081/" + path2);
      callback(null, req.body.userName + ".jpeg");
    }
  });
  var upload = multer({ storage: storage }).single("data");
  upload(req, res, function(err) {
    // console.log("3.." + req.body.userId);
    if (err) {
      reply[Constant.REPLY.MESSAGE] = "error";
      reply[Constant.REPLY.DATA] = "";
      reply[Constant.REPLY.RESULT_CODE] = "error";
      reply[Constant.REPLY.TOKEN] = "";
      return res.send(reply).end;
    } else {
      console.log("path2..." + path2);
      User.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: { profileImage: path2 } },
        { retunNewDocument: true },
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            reply[Constant.REPLY.MESSAGE] = "uploaded";
            reply[Constant.REPLY.DATA] = user;
            reply[Constant.REPLY.RESULT_CODE] = "";
            reply[Constant.REPLY.TOKEN] = "";
            return res.send(reply).end;
          }
        }
      );
    }
  });
};
