const Podcast = require('../models/podcast');

const createPodcast = async (req, res) => {
  try {
    const { title, description, audioUrl, imageUrl } = req.body;

    // Validate required fields
    if (!title || !description || !audioUrl || !imageUrl) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new podcast document
    const podcast = await Podcast.create({ title, description, audioUrl, imageUrl });

    res.status(201).json(podcast);
  } catch (error) {
    console.error('Error creating podcast', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPodcast,
};
