const express = require('express');

const messageController = require('../controllers/message');

const router = express.Router();

router.post('/message', messageController.postMessage);
router.get('/message/:conversationId', messageController.getMessages);

module.exports = router;
