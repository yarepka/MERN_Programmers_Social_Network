const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private (need token to be accessed)
router.get('/me', auth, async (req, res) => {
  try {
    // We have an access to req.user because of auth middleware
    // populate() adds 2 more properties (name and avatar) to
    // user property of profile object
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private (need token to be accessed)
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (Array.isArray(skills)) {
      profileFields.skills = skills;
    } else {
      profileFields.skills = skills.split(',').map((el) => el.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true } // if true return modified document
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);
      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    // populate() adds 2 more properties (name and avatar) to
    // user property of profile object
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  GET api/profile/loadPage?page=1&date=242134235&perPage=1
// @desc   Get next page with profiles
// @access Public
router.get('/loadPage', async (req, res) => {
  try {
    // Get page
    const page = parseInt(req.query.page);
    const dateInMilliseconds = parseInt(req.query.date);
    const profilesPerPage = req.query.perPage
      ? parseInt(req.query.perPage)
      : config.get('profilesPerPage');

    if (!page && !dateInMilliseconds) {
      return res
        .status(400)
        .json({ msg: 'page and date query parameters must be specified' });
    }

    const dateFromMilliseconds = new Date(dateInMilliseconds);

    // Get next page profiles
    const profiles = await Profile.find({
      date: { $lte: dateFromMilliseconds },
    })
      .sort({ date: 'desc' })
      .skip((page - 1) * profilesPerPage)
      .limit(profilesPerPage)
      .populate('user', '_id name avatar');

    return res.status(200).json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    // populate() adds 2 more properties (name and avatar) to
    // user property of profile object
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    console.log(profile);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    return res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private (need token)
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private (need token)
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // unshift() same as push, but pushes at the beggining of
      // an array rather than in the end
      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private (need token)
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private (need token)
router.put(
  '/education',
  [
    auth,
    [
      body('school', 'School is required').not().isEmpty(),
      body('degree', 'Degree is required').not().isEmpty(),
      body('fieldofstudy', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      // unshift() same as push, but pushes at the beggining of
      // an array rather than in the end
      profile.education.unshift(newEdu);

      await profile.save();

      return res.json(profile);
    } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private (need token)
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      ),
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`,
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      // check for 200 response
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }

      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
