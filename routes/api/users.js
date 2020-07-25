const express = require('express');
const router = express.Router();
// Users avatar is based on email (github uses avatar)
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  Public (Public - don't need token to acces route)
router.post('/', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email: email });

    if (user) {
      // Matching the same object pattern as we did above
      return res.status(400).json({ errors: [{ msg: 'User already exist' }] });
    }

    // Get users gravatar (based on email)
    const avatar = gravatar.url(email, {
      // size
      s: '200',
      // no naked ppl or anything bad
      r: 'pg',
      // default image if user has no avatar
      d: 'mm'
    });

    user = new User({
      name,
      email,
      avatar,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
        res.json({ token: token });
      }
    );

  } catch (err) {
    console.error(err.message);
    return res.state(500).send('Server error');
  }

});

module.exports = router;
