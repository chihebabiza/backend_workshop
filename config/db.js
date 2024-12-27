const mongoose = require('mongoose');


// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Disconnect from MongoDB
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};

module.exports = { connectDB, disconnectDB };
