const mongoose =require("mongoose")

const UserSchema =new mongoose.Schema({

    username:{
        type:String,
        required: true,
        min:3,
        max:15,
        unique: true
    },
    email:{
        type :String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        reqired:true,
        min:6

    },
    profilePicture:{
        type:String,
        default:""
    },
    coverpicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }, desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50,
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3,4]
    }


},
{timestamps: true}
)
module.exports =mongoose.model("User",UserSchema)