const express=require('express');
const { registerController,loginController, currentUserController } = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router =express.Router();


// Register New User Route
router.post('/register',registerController);


// Login Existing User Route
router.post('/login',loginController);

// Get current user route
router.get('/current-user',authMiddleware,currentUserController);


module.exports=router;