require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const sendMessageRoutes = require('./routes/send-message');
const googleCalendar = require('./routes/calendar');

const callLogsRoutes = require('./routes/callLogs'); 
const connectDb=require("./utils/db");
const router=require("./routes/userRoute.js");
const authMiddleware = require('./middlewares/authMiddleware');


const app = express();
// const PORT = process.env.PORT || 3000;
const PORT=3000;

// MongoDB connection

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

// Routes
app.use('/api/auth',router);

app.use('/api', apiRoutes);
app.use('/api/messages', sendMessageRoutes); 
app.use('/calendar', googleCalendar);
app.use('/imf', callLogsRoutes); // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

connectDb().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
