const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song"); 
const User = require("../models/User"); 

router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
        return res.status(400).json("Insufficient details to create song");
    }

    const artist = req.user._id; 
    const songDetails = { name, thumbnail, track, artist }; 

    try {
        const createdSong = await Song.create(songDetails);
        return res.status(201).json(createdSong); 
    } catch (error) {
        console.error(error); 
        return res.status(500).json("An error occurred while creating the song");
    }
});

router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser  = req.user;

    try {
        const songs = await Song.find({ artist: currentUser ._id }).populate("artist"); 
        return res.status(200).json({ data: songs });
    } catch (error) {
        console.error(error); 
        return res.status(500).json("An error occurred while fetching songs");
    }
});

router.get("/get/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { artistId } = req.params;
        const artist = await User.findById(artistId);
        if (!artist) {
            return res.status(404).json("Artist not found");
        }
        const songs = await Song.find({ artist: artistId });
        return res.status(200).json({ data: songs });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/get/songname/:songname", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const { songname } = req.params;
        console.log("Received songname:", songname); // Debugging log
        const songs = await Song.find({ name: { $regex: songname, $options: "i" } }).populate("artist");
        return res.status(200).json({ data: songs });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.post("/like", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const songId = req.song._id; 
    const songDetails = { liked }; 

    try {
        const createdSong = await Song.create(songDetails);
        return res.status(201).json(createdSong); 
    } catch (error) {
        console.error(error); 
        return res.status(500).json("An error occurred while creating the song");
    }
});

module.exports = router;