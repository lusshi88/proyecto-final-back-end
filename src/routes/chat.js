const express = require('express');

const chatsControllers = require("../controllers/chatsControllers");

const router = express.Router();

router.post('/messages',chatsControllers.createMessage);

router.get('/messages',chatsControllers.getMessages);


module.exports = router;