const { User } = require('../../models');

const router = require('express').Router();

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username:'barry',
            password: 'hellosdlkjfw',
            email: 'barry@gmail.com'
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json(newUser);
        })
    } catch (error) {
        res.status(500).json({msg:'error from user route'});
    }
})

module.exports = router;