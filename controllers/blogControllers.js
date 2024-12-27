const Blog = require('../models/Blog.js');
const { connectDB, disconnectDB } = require('../config/db.js')

const getAllBlogs = async (req, res) => {
    try {
        await connectDB();
        const blogs = await Blog.find(); // Get all blogs from DB
        res.render('index.ejs', { blogs });
    } catch (err) {
        res.status(500).send('Error fetching blogs');
    } finally {
        await disconnectDB();
    }
};

const createBlog = async (req, res) => {
    try {
        await connectDB();
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error saving blog');
    } finally {
        await disconnectDB();
    }
};

const getEditBlogPage = async (req, res) => {
    try {
        await connectDB();
        const blog = await Blog.findById(req.params.id);  // Find blog by id
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('edit', { blog });
    } catch (err) {
        res.status(500).send('Error fetching blog for editing');
    } finally {
        await disconnectDB();
    }
};

const getAddBlog = (req, res) => {
    try {
        res.render('add.ejs');
    } catch (err) {
        res.status(500).send('Error fetching blog for editing');
    }
};

const updateBlog = async (req, res) => {
    try {
        await connectDB();
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) {
            return res.status(404).send('Blog not found');
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error updating blog');
    } finally {
        await disconnectDB();
    }
};

const deleteBlog = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error deleting blog');
    } finally {
        await disconnectDB();
    }
};

module.exports = {
    getAllBlogs,
    createBlog,
    getAddBlog,
    getEditBlogPage,
    updateBlog,
    deleteBlog
};
