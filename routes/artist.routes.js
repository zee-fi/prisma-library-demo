const express = require('express');
const router = express.Router();
const prisma = require('../db/index');

router.post('/artist', (req, res, next) => {
    const { name, location } = req.body;

    const newArtist = {
        name,
        location,
    }

    prisma.artist
        .create({data: newArtist}) 
        .then(artist => {
            res.status(201).json(artist)
        })
        .catch((err) => {
            console.log("unable to create artist", err)
            res.status(500).json({message: "unable to create artist"})
        })
});

router.get('/artist', (req, res, next) => {

    prisma.artist
        .findMany()
        .then(allArtists => {
            res.status(200).json(allArtists)
        })
        .catch((err) => {
            console.log("unable to fetch artists", err)
            res.status(500).json({message: "unable to fetch artists"})
        })
});

module.exports = router;