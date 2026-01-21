const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

// Only Admin can access this route
router.get('/dashboard', authMiddleware, authorize('Admin'), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
