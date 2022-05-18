const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    const input = req.body;

    try {
        const newPost = await Post.create({...input, userId: req.session.userId});
        res.json(newPost);

    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;