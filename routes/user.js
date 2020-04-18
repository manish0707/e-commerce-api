const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin, errorHandler } = require('../controllers/auth');

router.param("userId", getUserById)

router.get('/user/:userId', isSignedIn, errorHandler, isAuthenticated , getUser)
router.put('/user/:userId', isSignedIn, errorHandler, isAuthenticated , updateUser)

module.exports = router;