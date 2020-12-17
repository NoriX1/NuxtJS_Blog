const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const passportStrategy = require('./middlewares/passport-strategy');

const keys = require('./keys');

const mongoParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(keys.mongoURI, mongoParams, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(err);
  }
  // eslint-disable-next-line no-console
  console.log('Database connected successfully');
});

app.use(passport.initialize());
passport.use(passportStrategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

module.exports = app;
