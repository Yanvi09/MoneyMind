const express = require('express');
const router = express.Router();
const { askGPT } = require('../controllers/aiCtrl');
router.post('/', askGPT);
module.exports = router;
