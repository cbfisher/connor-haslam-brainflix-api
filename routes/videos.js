const express = require('express');
const router = express.Router();
const Videos = require('../data/videos.json');
const fs = require('fs');
const path = require('path');

let videos = Videos;

router.get('/videos', (req, res) => {
  console.log('Requested video page');
  console.log(req.query);
  res.json(videos);
});

router.get('/videos/:id', (req, res) => {
  console.log(req.params);
  const activeVideo = videos.find((video) => video.id == req.params.id);
  if (activeVideo) {
    res.json(activeVideo);
  } else {
    res.status(404).send('Video not found with that id');
  }
});

router.post('/videos', (req, res) => {
  console.log(req.body);
  videos.push(req.body);
  const videosFilePath = path.join(__dirname, '../data', 'videos.json');
  fs.writeFile(videosFilePath, JSON.stringify(videos, null, 2), (err) => {
    if (err) {
      console.error('Error writing to the JSON file:', err);
      res.status(500).send('Error saving video data.');
    } else {
      console.log('New video object saved to the JSON file.');
      res.status(201).send('You have created a new video');
    }
  });
});

module.exports = router;
