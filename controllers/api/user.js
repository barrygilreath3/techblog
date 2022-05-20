const router = require('express').Router();
const { User } = require('../../models');

// This route will add a user to the database - Works!
// /api/user/
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
        })

            res.status(200).json(newUser);


    } catch (error) {
        res.status(500).json(error);
    }
});

// This route logs a user into the site
// api/user/login
router.post('/login', async (req, res) => {
    try {
        const findUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        req.session.save(() => {
            req.session.userId = findUser.id;
            req.session.username = findUser.username;
            req.session.loggedIn = true;
        });

        res.json({findUser, message: `You are logged in now`});

    } catch (error) {
        res.status(400).json( {msg: 'Uh-oh!  We have no record of this user account in our database :(.  Please enter a valid user account name!'})
    }
});

module.exports = router;