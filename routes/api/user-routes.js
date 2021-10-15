const router = require('express').Router();

const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');




// /api/users
router.route('/')
.get(getAllUsers)
.post(createUser);

// /api/users/:id
router.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

// /api/users/:userId/friends/:friendId
router.route('/:userid/friends/:friendId')
.post(addFriend)
.delete(removeFriend);




module.exports = router;