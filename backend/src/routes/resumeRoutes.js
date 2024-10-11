const express = require('express');
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/parse', auth, resumeController.parseResume);

module.exports = router;