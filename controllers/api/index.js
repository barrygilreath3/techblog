const router = require('express').Router();
const userRoutes = require('./user');
const commentRoutes = require('./comments');
const postRoutes = require('./posts');

router.use('/user', userRoutes);
router.use('/comment', commentRoutes);
router.use('/post', postRoutes);

module.exports = router;