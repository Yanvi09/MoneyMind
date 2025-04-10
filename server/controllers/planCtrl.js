const Plan = require('../models/Plan');

const savePlan = async (req, res) => {
  try {
    const newPlan = new Plan({
      user: req.user.id,
      goal: req.body.goal,
      amount: req.body.amount,
      duration: req.body.duration,
      riskLevel: req.body.riskLevel
    });

    await newPlan.save();
    res.status(200).json({ message: 'Plan saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving plan', error: err.message });
  }
};

module.exports = { savePlan };
