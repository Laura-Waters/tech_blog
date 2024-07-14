const router = require('express').Router();
// const { User, Post } = require('../models');


router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (e) {
    console.log(e);
    res.status(200).json('Something went wrong!');
  }
});

module.exports = router;