// models/podcast.js
const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  audioUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Podcast = mongoose.model('Podcast', podcastSchema);
module.exports = Podcast;
