const router = require('express').Router();
const { getAllUsers, getCurrentUser } = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/:id', getCurrentUser);

module.exports = router;