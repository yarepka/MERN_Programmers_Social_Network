const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public (Public - don't need token to acces route)
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
