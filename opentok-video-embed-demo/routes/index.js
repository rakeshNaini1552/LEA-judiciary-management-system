
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});


router.use('/setup', require('./setup_route'));
router.use('/dashboard', require('./dashboard_route'));
router.use('/meetings', require('./meetings_route'));

module.exports = router;