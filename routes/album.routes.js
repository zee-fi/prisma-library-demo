const express = require("express");
const router = express.Router();
const prisma = require("../db/index");

router.post('/album', (req, res, next) => {
    const { title, year, genre, artistName, artistId, createdAt, updatedAt } = req.body;

    const newAlbum = {
        title,
        year,
        genre,
        artistName,
        artist: {
            connect: {id: artistId}
        }
    }

    prisma.album
        .create({ data: newAlbum })
        .then(album => {
            res.status(201).json(album)
        })
        .catch((err) => {
            console.log("error creating new album", err)
            res.status(500).json({message: "error creating new album"})
        })
});

router.get('/album', (req, res, next) => {

    prisma.album
        .findMany()
        .then(allAlbums => {
            res.json(allAlbums)
        })
        .catch((err) => {
            console.log("error fetching albums", err)
            res.status(500).json({message: "error fetching albums"})
        })
});

router.get('/album/:albumId', (req, res, next) => {
    const {albumId} = req.params;

    prisma.album
        .findUnique({ where: { id: albumId }})
        .then(album => {
            if(!album) {
                req.status(404).json({message: "album not found" })
            } else {
                res.json(album)
            }
        })
        .catch((err) => {
            console.log("error fetching album by Id", err)
            res.status(500).json({message: "error fetching album by Id"})
        })
});

router.put('/album/:albumId', (req, res, next) => {
    const {albumId} = req.params;
    const { title, year, genre, artistName } = req.body;

    const updatedDetails = {
        title, 
        year, 
        genre, 
        artistName
    }

    prisma.album
        .update({ where: { id: albumId }, data: updatedDetails})
        .then(updatedAlbum => {
            res.json(updatedAlbum)
        })
        .catch((err) => {
            console.log("could not update", err)
            res.status(500).json({message: "could not update"})
        })
});

router.delete('/album/:albumId', (req, res, next) => {
    const {albumId} = req.params;

    prisma.album
        .delete({where: {id: albumId}})
        .then(() => {
            res.json({message: `album with id ${albumId} was deleted`})
        })
        .catch((err) => {
            console.log("error deleting album", err)
            res.status(500).json({message: "error deleting album"})
        })
});

module.exports = router;

