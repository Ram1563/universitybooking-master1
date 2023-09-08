const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

router.use(jwtMiddleware);

// Get available sessions
router.get('/sessions', sessionController.viewSessions);

// Book a session
router.post('/book', sessionController.bookSession);

// Get pending sessions for dean
router.get('/pending-sessions', sessionController.viewPendingSessions);

module.exports = router;
