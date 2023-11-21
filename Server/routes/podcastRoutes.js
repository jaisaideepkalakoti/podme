const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');

router.post('/create-podcast', podcastController.createPodcast);

module.exports = router;
