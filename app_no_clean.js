const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Database connection
mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', UserSchema);

// Routes
app.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Home' });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users.ejs', { users });
  } catch (err) {
    res.status(500).send('Error fetching users');
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });
    await user.save();
    res.redirect('/users');
  } catch (err) {
    res.status(500).send('Error creating user');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

