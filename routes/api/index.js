const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

router.use('/users', users);
router.use('/thoughts', thoughts);


module.exports = router;