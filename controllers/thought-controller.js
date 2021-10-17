const {Thought, User} = require('../models');

const thoughtController = {
    // get All Thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .populate({
            path:'thoughts',
            select: '-__v',
        })
        .select('-__v')
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get on thought by id
    getThoughtById({params},res) {
        Thought.findOne({_id:params.id})
        .then((dbThoughtData) => {
         if (!dbThoughtData) {
             res.status(404).json({message:'No thought found with this Id'});
             return;
         }
         res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        }); 
    },

    // create a new thought
    createThought({body},res) {
        Thought.create(body)
        .then((dbThoughtData) =>{
             User.findOneAndUpdate(
                {_id: body.userId}, 
                {$push:{ thoughts: dbThoughtData._id}},
                {new:true}
                );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message:'No user found with this Id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // update thought by id
    updateThoughtById({params,body},res) {
        Thought.findOneAndUpdate({_id:params.id},body,{new:true})
        .then((dbThoughtData) =>{
            if (!dbThoughtData) {
                res.status(404).json({message:'No thought found with this Id'});
                return;
                
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },

    // delete a thought by Id
    deleteThoughtById({params},res) {
        Thought.findOneAndDelete({_id:params.id})
        .then((dbThoughtData) =>{
            if (!dbThoughtData) {
                res.status(404).json({message:'No thought found with this Id'});
                return;
            }
            User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: {thoughts:params.id}}
            )
            .then (() =>{
                res.json({message:'Successfully deleted the thought'});
            })
            .catch((err) =>res.status(400).json(err));
            
        })
        .catch((err) => res.status(400).json(err));
    },

    // add Reaction

    addReaction({params,body},res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$addToSet: {reactions:body}},
            {new:true}
            )
            .then((dbThoughtData) =>{
                if (!dbThoughtData) {
                    res.status(404).json({message:'No thought found with this Id'});
                    return;                    
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },
    // delete reaction
    deleteReaction({params,body},res) {
        Thought.findOneAndUpdate(
            {_id:params.thoughtId},
            {$pull: {reactions:{reactionId: body.reactionId } } },
            {new:true}           
            
      )
      .then((dbThoughtData) => {
          if (!dbThoughtData) {
              res.status(404).json({message:'No thought found with this Id'});
              return;
          }        
           res.json(dbThoughtData);
        })
      .catch((err) => res.status(400).json(err));
    },
};

module.exports = thoughtController;