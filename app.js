const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const controllers = require('./controllers/blogControllers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', controllers.getAllBlogs);
app.get('/add', controllers.getAddBlog);
app.post('/add', controllers.createBlog);
app.post('/delete', controllers.deleteBlog);


app.listen(3000, () => {
    console.log("App running on port 3000");
});
