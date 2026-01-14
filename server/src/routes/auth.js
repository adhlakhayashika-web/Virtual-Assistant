const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

// register
router.post('/register', async (req, res)=>{
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if(existing) return res.status(400).json({msg:'User exists'});
  const ph = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash: ph });
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
});

// login
router.post('/login', async (req, res)=>{
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(400).json({ msg: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email }});
});

module.exports = router;
