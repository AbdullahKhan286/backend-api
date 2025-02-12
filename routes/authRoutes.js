const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureAuth, adminAuth } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', ensureAuth, authController.currentUser);
router.get('/admin', ensureAuth, adminAuth(['admin']), (req, res) => res.json({ message: 'Admin access granted' }));
router.get('/moderator', ensureAuth, adminAuth(['admin', 'moderator']), (req, res) => res.json({ message: 'Moderator access granted' }));

module.exports = router;
