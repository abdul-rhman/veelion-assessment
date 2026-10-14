const activityService = require('../services/activity.service');

async function listActivity(req, res) {
  const activities = await activityService.getAllActivity();
  res.status(200).json(activities);
}

async function createActivity(req, res) {
  const bodyData = req.body || {};
  const { validateCreateActivity } = require('../utils/activityValidator');
  const normalized = validateCreateActivity(bodyData);
  const activity = await activityService.createActivity(normalized);
  res.status(201).json(activity);
}

module.exports = {
  listActivity,
  createActivity,
};
