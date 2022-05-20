const router = require ('express').Router();
const { Comment } = require('../../models');

// This route adds a comment to a post
router.post('/'), async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId,
        });
        res.json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = router;