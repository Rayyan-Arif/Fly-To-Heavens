const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.authorize, authController.logOut);
router.get('/me', authController.authorize, userController.getUser);
router.patch('/update-me', authController.authorize, userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateUserData);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/update-password', authController.authorize, authController.updatePassword);
router.delete('/close-account', authController.authorize, authController.closeAccount);

module.exports = router;