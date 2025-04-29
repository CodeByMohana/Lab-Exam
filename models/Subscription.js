const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true, trim: true },
  cost: { type: String, required: true, trim: true },
  startDate: { type: String, required: true, trim: true },
  endDate: { type: String, trim: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);