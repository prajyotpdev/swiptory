const router = require('express').Router();
const Story = require('../models/story');

router.post('/add', async (req, res) => {
  try {
    const { author, slides, category } = req.body;
    const uniqueCategories = new Set(slides.map(slide => slide.category));
    if (uniqueCategories.size > 1) {
      return res.status(400).json({ error: 'All slides must have the same category' });
    }

    if (slides.length < 3 || slides.length > 6) {
      return res.status(400).json({ error: 'The number of slides should be between 3 and 6' });
    }

    const newStory = new Story({ author, slides, category });
    const savedStory = await newStory.save();

    res.status(201).json(savedStory);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.get('/all', async (req, res) => {
     try {
       const stories = await Story.find().populate('author', 'name');
       res.status(200).json(stories);
     } catch (err) {
       res.status(500).json({ error: 'Something went wrong' });
     }
   });


router.get('/category', async (req, res) => {
     try {
       const stories = await Story.find().populate('author', 'name');
       res.status(200).json(stories);
     } catch (err) {
       res.status(500).json({ error: 'Something went wrong' });
     }
   });


   module.exports = router;