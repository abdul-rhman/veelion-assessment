const activityService = require('../services/activity.service');
const {
  validateCreateActivity,
  validateUpdateActivity,
} = require('../utils/activityValidator');

async function listActivity(req, res) {
  const activities = await activityService.getAllActivity();
  res.status(200).json({ data: activities });
}

async function getActivity(req, res) {
  const activity = await activityService.getActivityById(req.params.id);
  res.status(200).json({ data: activity });
}

async function createActivity(req, res) {
  const payload = req.body || {};
  const normalized = validateCreateActivity(payload);
  const activity = await activityService.createActivity(normalized);
  res.status(201).json({ data: activity });
}

async function patchActivity(req, res) {
  const updates = req.body || {};
  const normalized = validateUpdateActivity(updates);
  const activity = await activityService.updateActivity(req.params.id, normalized);
  res.status(200).json({ data: activity });
}

async function removeActivity(req, res) {
  await activityService.deleteActivity(req.params.id);
  res.status(204).send();
}

module.exports = {
  listActivity,
  getActivity,
  createActivity,
  patchActivity,
  removeActivity,
};
