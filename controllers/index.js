const router = require('express').Router();

// Render data to homepage
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboardroutes')

// API Routes
const apiRoutes = require('./api/');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;