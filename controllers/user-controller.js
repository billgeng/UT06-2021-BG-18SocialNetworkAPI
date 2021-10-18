const { User } = require('../models');
const { populate } = require('../models/User');

const userController = {
    
    // get all Users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path:'thoughts',
            select: '-__v',
        })
        .populate({
            path:'friends',
            select:'-__v',
        })
        .select('-__v')
        .sort({_id:-1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },
   
    // get one User by Id
    getUserById({params},res) {
        User.findOne({_id:params.id})
        .populate({
            path:'thoughts', 
            select: '-__v'
        })
        .populate({
            path:'friends',
            select:'-__v',
        })
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this Id'});
                return;
            }
            res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // create a new User
    createUser({body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    // update user by id
    updateUserById({params,body},res) {
        User.findOneAndUpdate({_id:params.id},body,{new:true})
        .then((dbUserData) =>{
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // delete a user by id
    deleteUserById({params}, res) {
        User.findOneAndDelete({_id:params.id})
        .then((dbUserData) =>{
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // add friend
    addFriend({params},res) {
                
        User.findOneAndUpdate(
            {_id:params.userId},
            {$push: {friends:params.friendsId }},
            {new: true}        
        )
        .then ((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this Id'});
                return;
            }
              res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // remove friend from list
    removeFriend({params},res) {
        User.findOneAndUpdate(
            {_id:params.userId},
            {$pull: {friends:params.friendsId}},
            {new: true} 
            )
            .then((dbUserData) =>{
                if (!dbUserData) {
                    res.status(404).json({message:'No user found with this Id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = userController;