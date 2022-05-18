const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({msg:'error from user route'});
    }
});

router.post('/login'), async (req, res) => {
    try {
        const findUser = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        res.json({findUser, message: `You are logged in now`});

    } catch (error) {
        res.status(400).json( {msg: 'Uh-on!  We have no record of this user account in our database :(.  Please enter a valid user account name!'})
    }
}

module.exports = router;