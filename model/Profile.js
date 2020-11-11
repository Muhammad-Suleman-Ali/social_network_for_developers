const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create  Schema

const profileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type:String,
        required:true,
        max:40
    },
    copmany:{
        type:String
    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[
        {
            title:{
                type:String,
                require:true
            },
            copmany:{
                type:String,
                required:true
            },
            location:{
                type:String
            },
            copmany:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
            
        }
    ],
    education:[
        {
            school:{
                type:String,
                require:true
            },
            degree:{
                type:String,
                required:true
            },
            fieldofstudy:{
                type:String,
                required:true
            },
            copmany:{
                type:String,
                required:true
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            description:{
                type:String
            }
            
        }
    ],
    sociial:{
        youtube:{
            type:String,
        },
        facebook:{
            type:String,
        },
        twitter:{
            type:String,
        },
        linkedin:{
            type:String,
        },
        instagram:{
            type:String,
        }
    },
    date:{
        type:Date,
        default:Date.now
    }


});

module.exports= Profile = mongoose.model("profile",profileSchema)
