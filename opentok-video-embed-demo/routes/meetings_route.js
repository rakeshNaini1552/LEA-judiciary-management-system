const router = require('express').Router();


router.get('/create', (req, res) => {
  res.render('create_meeting');
});


router.get('/book', (req, res) => {
  
  let m_list = DB.meetings_filter(false);
  res.render('book_meeting', { meetings: [].concat(m_list.current, m_list.upcoming) });
});


router.post('/create', (req, res) => {
  
  const start_time = new Date(req.body.start_date);
  const end_time = new Date(start_time.getTime() + (parseInt(req.body.duration) * 60000));
  
  const m = {
    id: DB.meetings.length + 1, 
    start_time: start_time,
    end_time: end_time,
    booked: false
  };
  
  DB.meetings_put(m);
  
  res.redirect('/dashboard/lawyer')
});



router.post('/book', (req, res, next) => {
  
  let m = DB.meetings_get(parseInt(req.body.meeting_id));
  
  if (m == null) {
    next();
    return;
  };
  
  m.booked = true;
  
  DB.meetings_put(m);
  
  res.redirect('/dashboard/client');
});

router.get('/join/:meeting_id', (req, res, next) => {
    // Get meeting details from DB
    const m = DB.meetings_get(parseInt(req.params.meeting_id));
  
    if (m == null || !m.booked) {
      next();
      return;
    }
  
    const embed_code = DB.embed_code.replace('DEFAULT_ROOM', `meeting${m.id}`);
  
    
    if (!embed_code) {
      res.redirect('/setup');
      return;
    }
  
    if (Date.parse(m.end_time) < Date.now()) {
      res.locals.meeting_over = true;
    } else {
      res.locals.meeting_over = false;
    }
  
    res.render('meeting', { embed_code: embed_code, meeting: m });
  });

module.exports = router;