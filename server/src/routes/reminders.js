const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reminder = require('../models/Reminder');

router.post('/', auth, async (req, res) => {
  const { title, notes, dueAt } = req.body;
  const rem = await Reminder.create({ userId: req.user.id, title, notes, dueAt });
  res.json(rem);
});

router.get('/', auth, async (req, res) => {
  const list = await Reminder.find({ userId: req.user.id }).sort({ dueAt: 1 });
  res.json(list);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Reminder.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
