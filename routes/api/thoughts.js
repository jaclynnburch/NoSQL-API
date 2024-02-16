const router = require('express').Router();
const Thought = require('../../models/thought.js');
const User = require('../../models/user.js');


// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new thought
router.post('/', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const thought = new Thought({ thoughtText, username, userId });
    const savedThought = await thought.save();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    user.thoughts.push(savedThought._id);
    await user.save();
    res.status(201).json(savedThought);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});
//have to export router
module.exports = router;