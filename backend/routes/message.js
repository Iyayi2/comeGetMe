const express = require('express');

const messageController = require('../controllers/message');

const router = express.Router();

router.get('/message', messageController.getMessage);
router.post('/message', messageController.postMessage);
router.get('/message/:conversationId', messageController.getMessages);

module.exports = router;
