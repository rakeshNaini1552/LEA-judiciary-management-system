const router = require('express').Router();


router.get('/', (req, res) => {
  
  res.render('setup', { data: DB.embed_code || "" });
});

router.post('/', (req, res) => {
  DB.embed_code = req.body.embed_code_value.trim();
  res.redirect('/');
});

// Export the router
module.exports = router;