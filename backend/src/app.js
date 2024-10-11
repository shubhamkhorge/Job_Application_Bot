const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5123;

app.use(express.json());
app.use(errorHandler);
app.use('/api/resume', resumeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);


// Database connection
mongoose.connect(process.env.MONGODB_URI,)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

// Routes (to be added later)
app.get('/', (req, res) => {
  res.send('AI-Powered Job Application Bot API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});