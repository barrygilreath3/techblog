const router = require('express').Router();
const {Post, Comment, User} = require('../models');

// Everything will be a get route, all others need to be in api
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/profile')
        return
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn){
        res.redirect('/')
        return
    }
    res.render('signup');
})

module.exports = router;