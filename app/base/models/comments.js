var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var commentSchema = new Schema({
userId:{
       type:String
   } ,
 postId:{
       type:String
   },
  commentId:{
      type:String
  },
  comment:{
      type:String
  },
  reply:[{
          userId:{
              type:String
          },
          reply:{
              type:String
          },
          like:{
              type:Number
          }
      }],
})
var comment = mongoose.model('comment',commentSchema);
module.exports= comment;