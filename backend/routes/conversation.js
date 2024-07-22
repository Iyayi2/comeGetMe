const express = require('express');

const conversationController = require('../controllers/conversation');

const router = express.Router();

router.post('/conversation', conversationController.postConversation);
router.get('/conversation/:userId', conversationController.getConversation);
router.get('/conversation/find/:firstUserId/:secondUserId', conversationController.getConversations)


module.exports = router;
