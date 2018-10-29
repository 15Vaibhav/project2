var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var postsSchema = new Schema({
  postId: {
    type: String,
    require: true,
    unique: true
  },
  userId: {
    type: String
  },
  postsCaption: {
    type: String,
    require: true
  },
  postImages: {
    type: [String]
  },
  fullPost: {
    type: String,
    require: true
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  // comments:[{
  // userId:{
  //         type:String
  //        } ,
  //     profileImage:{
  //      type:String
  //  },
  //  userName:{
  //      type:String
  //  },
  //  commentId:{
  //     type:String
  // },
  // comment:{
  //     type:String
  // },
  // reply:[{
  //         userId:{
  //             type:String
  //         },
  //         userName:{
  //             type:String
  //         },

  //         reply:{
  //             type:String
  //         },
  //         like:{
  //             type:Number
  //         }
  //     }],
  // }],
  share: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    require: true
  },

  location: {
    type: [Number],
    index: "2d"
  },

  create_date: {
    type: String
  },
  update_date: {
    type: String
  },
  mediaType: {
    type: Number
  },
  address: {
    type: String
  }
});
var post = mongoose.model("post", postsSchema);
module.exports = post;
