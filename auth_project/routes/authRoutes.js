const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuth, adminAuth } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getuser', ensureAuth, authController.getUser);

module.exports = router;
