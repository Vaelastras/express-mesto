const router = require('express').Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUserById);

module.exports = router;
