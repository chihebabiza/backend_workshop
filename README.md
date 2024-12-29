# Express.js and MongoDB Tutorial

## Table of Contents
- [Prerequisites](#prerequisites)
- [Agenda](#agenda)
- [Getting Started](#getting-started)
  - [Express.js First App](#expressjs-first-app)
  - [Express GET Requests](#express-get-requests)
  - [Request Types](#request-types)
  - [MongoDB Integration](#mongodb-integration)
  - [MongoDB CRUD Operations](#mongodb-crud-operations)
  - [EJS Templates](#ejs-templates)
  - [Clean Code and MVC Architecture](#clean-code-and-mvc-architecture)

## Prerequisites

Before starting, you'll need to install:

1. **Node.js**: Download and install from [Node.js Official Website](https://nodejs.org/en/download/)
2. **MongoDB Compass**: Download and install from [MongoDB Compass Download](https://www.mongodb.com/try/download/compass)

## Agenda

1. Understanding Server Concepts
2. Express.js Basics
3. HTTP Request Types
4. MongoDB Integration
5. CRUD Operations
6. Template Engine (EJS)
7. MVC Architecture Implementation

## Getting Started

### Express.js First App

1. Initialize Node project:
```bash
npm init -y
```

2. Install Express:
```bash
npm i express
```

3. Create `app.js`:
```javascript
const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log("app running on port 3000");
});
```

4. Run the application:
```bash
node app.js
```

### Express GET Requests

```javascript
// Basic route
app.get('/', function(req, res) {
    res.send("Hello world");
});

// Serving HTML files
app.get('/index', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});
```

### Request Types

First, install body-parser:
```bash
npm i body-parser
```

```javascript
// 1. GET Request: Retrieve data
app.get('/data', (req, res) => {
    res.send('received data here');
});

// 2. POST Request: Create data
app.post('/sendData', (req, res) => {
    const data = req.body;
    res.send("data sent with success");
});

// 3. PUT Request: Update data
app.put('/data/:id', (req, res) => {
    const id = req.params.id;
    res.send("data has updated");
});

// 4. DELETE Request: Delete data
app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    res.send("Data has deleted");
});
```

### MongoDB Integration

1. Install Mongoose:
```bash
npm i mongoose
```

2. Create MongoDB Model:
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

3. Connect to MongoDB:
```javascript
const mongoURI = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
```

### MongoDB CRUD Operations

```javascript
// Create
app.post('/create', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send("data saved");
});

// Read
app.get('/', async (req, res) => {
    const users = await User.find();
    res.sendFile('index.html', {root: __dirname});
});

// Update
app.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(user);
});

// Delete
app.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User deleted successfully'});
});
```

### EJS Templates

1. Install EJS:
```bash
npm i ejs
```

2. Render EJS template:
```javascript
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('index.ejs', {users});
});
```

3. EJS Syntax Example:
```ejs
<h1>Users</h1>
<% users.forEach(user => { %>
    <p><%= user.name %></p>
<% }); %>
```

### Clean Code and MVC Architecture

Project Structure:
```
project/
├── config/         # Database configuration
├── controllers/    # Route controllers
├── models/         # Database models
├── views/          # EJS templates
├── public/         # Static files (CSS, JS, images)
└── app.js         # Main application file
```

Detailed implementation examples for the Blog project can be found in the source code files within this repository.

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
