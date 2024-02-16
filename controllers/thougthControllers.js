const user = require('../models/user');
const thought = require('../models/thought');

module.exports = {
    getAllThoughts(req, res) {
        thought.find({})
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(400).json(err));
    },

    // create a new thought and add it 
    createThought(req, res) {
        thought.create(req.body)
            .then(({ _id }) => {
                return user.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // get a single thought by id

    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
     } );

     deleteThought(req, res) 
        thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return user.findOneAndUpdate(
                    { username: req.params.username },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
            }
            )
        }
    }
