const express = require('express');

const conversationController = require('../controllers/conversation');

const router = express.Router();

router.post('/conversation', conversationController.postConversation);
router.get('/conversations/', conversationController.getConversations);
router.get('/conversation/:sellerId/:productId', conversationController.findConversation)


module.exports = router;
