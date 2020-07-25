const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

// @route   GET api/auth
// @desc    Returns user by token
// @access  Public (Public - don't need token to acces route)
router.get('/', auth, async (req, res) => {
  try {
    // returns user without password field
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public (Public - don't need token to acces route)
router.post('/', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email: email });

    // if no user with such email
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // check wehenever password is matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    // create payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // sign token
    jwt.sign(
      payload,
      config.get('jwtSecret'), // stored at config/default.json
      { expiresIn: 360000 }, // should be 3600s = 1 hour
      (err, token) => {
        if (err) throw err;
        return res.json({ token: token });
      }
    );

  } catch (err) {
    console.error(err.message);
    return res.state(500).send('Server error');
  }

});

module.exports = router;
