const router = require('express').Router();

// Render data to homepage
const homeRoutes = require('./home-routes');

// API Routes
const apiRoutes = require('./api/');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;