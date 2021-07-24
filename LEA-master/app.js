const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash'); 
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const app = express();

//passport config
require('./config/passport')(passport);

//db config

//const db = require('./config/keys').MongoURI; //for MongoDB Atlas
const db = 'mongodb://127.0.0.1:27017/lea' //for local MongoDB

//db connection
mongoose.connect
(
    db, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then
(
    () => console.log('MongoDB Atlas connected...')
    //() => console.log('MongoDB Local connected...')
).catch
(
    (err) => console.log(err)
);


app.use(express.static(__dirname + '/public'));
/*ejs*/
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use
(
    session
    (
        {
            secret: require('./config/secret.js').secret,
            resave: true,
            saveUninitialized: true
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());
/*connect flash*/
app.use(flash());
app.use
(
    (req, res, next) =>
    {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    }
);

//Routes
app.use('/', require('./routes/index.js'));
app.use('/client', require('./routes/client.js'));
app.use('/lawyer', require('./routes/lawyer.js'));
app.use('/chat', require('./routes/chat.js'));


const PORT = process.env.PORT || 5000;
app.listen
(
    PORT,
    (err) =>
    {
        if(err)
            throw err;

        console.log(`Server started on PORT ${PORT}...`);
    }
);