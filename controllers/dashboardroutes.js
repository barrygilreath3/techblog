const { Post } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) =>  {
    try {
        const post = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        })
        console.log(post);

    } catch (error) {
        
    }

    res.json(post);
});

router.get('/new', async (req, res) => {
    res.render('post');
});

module.exports=router;