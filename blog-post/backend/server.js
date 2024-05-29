const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postes');
const globalErrorHandler = require('./utils/errorClass');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

app.use('/posts', postRoutes);

app.use((req, res, next) => {
  console.log('Received raw request body:', req.body);
  next();
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
