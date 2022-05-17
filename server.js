const express = require('express');
const path = require('path');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const models = require('./models');
const exphbs = require('express-handlebars');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };


const PORT = process.env.PORT || 3001;
const app = express();

app.use(session(sess));
app.use(routes);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// app.post('/api/user', (req, res) => {
//   User.create(req.body).then(userData => res.json(userData))
//   .catch(err => res.json(err))
// })

app.listen(PORT, () => {
    console.log('App listening on ' + PORT);
    sequelize.sync({
        force: false
    })
})