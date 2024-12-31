const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    track:{
        type:String,
        // required:true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    songs:[
        {
            type: mongoose.Types.ObjectId,
            ref: "Song",
        },
    ],
    collaborators:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ]
});

const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);

module.exports = PlaylistModel;