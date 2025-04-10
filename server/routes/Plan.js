const express = require('express');
const router = express.Router();
const { savePlan } = require('../controllers/planCtrl');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/save', authMiddleware, savePlan);

module.exports = router;
