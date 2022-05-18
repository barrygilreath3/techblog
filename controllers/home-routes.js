const router = require('express').Router();
const {Post, Comment, User} = require('../models');

// Everything will be a get route, all others need to be in api
router.get('/signup', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.render('signup');
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/profile')
        return
    }
    res.render('login');
})

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:[User]
        });
        res.render('home', postData) //Replace with a home.handlebars page ('home')
    } catch (error) {
        res.json(error)
    }
})

router.get('/post/:id'), async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const post = postData.get({plain: true});

        res.render('post', {post});

    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = router;