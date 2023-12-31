const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    postImg:{
        type:String
    },
    postAuthor:{
        type:String
    },
    postTitle:{
        type:String
    },
    postBody:{
        type:String
    },
    
    postComments:[
    {
    PostId:{
        type:String
    },
    PostcommentBody:{
    type:String
    },
    Timecreated:{
        type:Date
    }
    }
    ]
},
{ timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema);