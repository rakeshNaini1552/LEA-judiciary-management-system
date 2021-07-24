const router = require('express').Router();
router.get('/lawyer', (req, res) => {
  
  res.render('dashboard_lawyer', { meetings: DB.meetings_filter() })
});


router.get('/client', (req, res) => {
  res.locals.user = { role: 'client' };
  
  res.render('dashboard_client', { meetings: DB.meetings_filter(true) });
});

module.exports = router;