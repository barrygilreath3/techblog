const { Post } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) =>  {
    try {
        const content = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });

        const posts = content.map((post) => post.get({ plain: true }));

        res.render('dashboardroutes', {
          posts
        });
    
      } catch (err) {
        res.redirect('login');
    }
});

router.get('/new', async (req, res) => {
    res.render('post');
});

module.exports=router;