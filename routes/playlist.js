const express = require("express");
const passport = require("passport");
const router = express.Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const mongoose = require('mongoose');

router.post("/create",passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs) {
        return res.status(301).json({err:"Insufficient Data"});
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collacollaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
});

router.get("/get/playlist/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const playlistId = req.params.playlistId;
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        return res.status(400).json({ error: "Invalid playlist ID" });
    }
    const playlist = await Playlist.findOne({ _id: playlistId }).populate({path:"songs",
        populate: {
            path: "artist",
        }
    });
    if (!playlist) {
        return res.status(404).json({ error: "Playlist not found" });
    }
    return res.status(200).json(playlist);
});

router.get("/get/me", passport.authenticate("jwt",{session:false}), async (req,res) =>{
    const artistId = req.user._id;

    const playlists = await Playlist.find({owner:artistId}).populate("owner");
    return res.status(200).json({data: playlists})
});

router.get("/get/artist/:artistId", passport.authenticate("jwt",{session:false}), async (req,res) =>{
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id: artistId});
    if(!artist) {
        return res.status(404).json({error: "Artist not found"});
    }
    const playlists = await Playlist.find({owner:artistId});
    return res.status(200).json({data: playlists})
});

router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    try {
        const playlist = await Playlist.findOne({ _id: playlistId });
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        // Check if the current user is the owner or a collaborator
        if (!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const song = await Song.findOne({ _id: songId });
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        return res.status(200).json(playlist);
    } catch (error) {
        console.error("Error adding song to playlist:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;