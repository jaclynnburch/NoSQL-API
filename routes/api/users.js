const router = require('express').Router();
const User = require('../../models/user');


// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    const { username, email} = req.body;
    const user = new User({ username, email});
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a user by its _id
router.put('/:_id', async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete('/:_id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params._id);
    res.status(204).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    user.Friends.push(friendId);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    user.Friends.pull(friendId);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;