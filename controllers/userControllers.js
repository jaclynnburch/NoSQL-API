const User = require('../models/user');

module.exports = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .then(users => res.json(users))
            .catch(err => res.status(400).json(err));
    },
    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },
    // create user
    createUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
    },
    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
          .then(user => res.json(user))
          .catch(err => res.status(400).json(err));
    },
    // delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
          .then(user => res.json(user))
          .catch(err => res.status(400).json(err));
    },
    // add friend
    addFriend(req, res) {
        User.findOneAndUpdate( 
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true },
            (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                } else {
                    res.json(data);
                }
            }
        );
    },
    // delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json(err);
                } else {
                    res.json(data);
                }
            }
        );
    }  
};