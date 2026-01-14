const mongoose = require('mongoose');

const cmdSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trigger: { type: String, required: true }, // "start focus mode"
  script: { type: String, required: true },  // JS/Node command to run or a function name
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CustomCommand', cmdSchema);
