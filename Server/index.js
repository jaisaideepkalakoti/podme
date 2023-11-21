const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const Podcast = require('./models/podcast');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error('Database Connection Error:', err);
  });

app.use('/api', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', podcastRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle podcast creation
app.post('/api/createpodcast', upload.fields([{ name: 'audioFile', maxCount: 1 }, { name: 'imageFile', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const audioUrl = req.files['audioFile'][0].path;
    const imageUrl = req.files['imageFile'][0].path;

    // Create a new podcast in the database
    const newPodcast = await Podcast.create({
      title,
      description,
      audioUrl,
      imageUrl,
    });

    res.status(201).json({ message: 'Podcast created successfully', podcast: newPodcast });
  } catch (error) {
    console.error('Error creating podcast', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to handle fetching all podcasts
app.get('/api/podcasts', async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.status(200).json(podcasts);
  } catch (error) {
    console.error('Error fetching podcasts', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-multiple-podcasts', async (req, res) => {
  try {
    const { podcastIds } = req.body;

    if (!Array.isArray(podcastIds) || podcastIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or empty podcast IDs' });
    }

    const deleteResult = await Podcast.deleteMany({ _id: { $in: podcastIds } });

    if (deleteResult.deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'Podcasts deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'Podcasts not found' });
    }
  } catch (error) {
    console.error('Error deleting podcasts', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
