var express = require("express");
var appRouter = express.Router();
const postsController = require("./base/controller/postsController");
const imageController = require("./base/controller/imageController");
const userController = require("../app/base/controller/userController");
// appRouter.get('/router',(req,res)=>{
//     res.send("appController...");
// })
appRouter.post("/addPosts", postsController.ADD_POSTS);
appRouter.post("/postImage", imageController.ADD_POST_IMAGES);
appRouter.get("/getPosts", postsController.GET_POST);
appRouter.post("/createUser", userController.CREATE_USER);
appRouter.post("/updateProfile", userController.UPDATE_USER);
appRouter.post("/doFollow", userController.DO_FOLLOW);
appRouter.post("/updateProfileImage", imageController.UPDATE_PROFILE_IMAGE);
module.exports = appRouter;
