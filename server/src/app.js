const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const openaiRoutes = require('./routes/openai');
const remindersRoutes = require('./routes/reminders');

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/reminders', remindersRoutes);

app.get('/', (req, res) => res.send('Virtuo API'));
module.exports = app;
