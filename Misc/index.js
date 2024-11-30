const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const db = require('./db'); // Import the database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use authentication routes
app.use('/auth', authRoutes);

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
