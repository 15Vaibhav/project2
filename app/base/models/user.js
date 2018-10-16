var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userId:{
        type:String
    },
    name:{
        type:String
    },
    profileType:{
        type:Number
    },
    phoneNumber:{
        type:String
    },
    emailId:{
        type:String
    },
    organisationName :{
        type:String
    },
    designation:{
        type:String
    },
    gender:{
        type:String
    },
    aboutMe:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    personalEmailId:{
        type:String
    },
    personalPhoneNumber:{
        type:String
    },
    personalAddress:{
        type:String
    },
    numberOfPost :{
        type:Number
    },
    followers:[{
        name:{
            type:String
        },
        userId:{
            type:String
        },
        profileUrl:{
            type:String
        },
    }],
    following:{
        type:Number
    },
    rating:{
        type:Number
    },
    lastUpdatedDateTime:{
        type:String
    },
    userRegistrationDateTime:{
        type:String
    },
    userName:{
        type:String
    },
    profileImage:{
        type:String
    },
    userDescription:{
        type:String
    }, 
    personalPhoneNumber:{
        type:String
    },
   
})
var user = mongoose.model('users',userSchema);
module.exports = user;
