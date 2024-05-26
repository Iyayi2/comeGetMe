const express = require('express');

const messageController = require('../controllers/message');

const router = express.Router();

router.get('/message', messageController.getMessage);
router.post('/message', messageController.postMessage);

module.exports = router;
