const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThoughtById,
    deleteThoughtById,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
.get(getAllThought)
.post(createThought);

// /api/thoughts/:id
router.route(/:id)
.get(getThoughtById)
.put(updateThoughtById)
.delete(deleteThoughtById);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(deleteReaction);



module.exports = router;