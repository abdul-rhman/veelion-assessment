const path = require('node:path');

const { createId } = require('../../../utils/id');
const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const HttpError = require('../../../utils/httpError');

const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

function buildActivityRecord(payload) {
  return {
    id: createId(),
    action: payload.action,
    info: payload.info,
    when: new Date().toISOString(),
  };
}

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function getActivityById(activityId) {
  const activities = await readJsonArray(ACTIVITY_FILE_PATH);
  const activity = activities.find((item) => item.id === activityId);

  if (!activity) {
    throw new HttpError(404, 'Activity not found.');
  }

  return activity;
}

async function createActivity(payload) {
  const activities = await readJsonArray(ACTIVITY_FILE_PATH);
  const newActivity = buildActivityRecord(payload);
  activities.push(newActivity);
  await writeJsonArray(ACTIVITY_FILE_PATH, activities);
  return newActivity;
}

async function updateActivity(activityId, updates) {
  const activities = await readJsonArray(ACTIVITY_FILE_PATH);
  const activityIndex = activities.findIndex((item) => item.id === activityId);

  if (activityIndex === -1) {
    throw new HttpError(404, 'Activity not found.');
  }

  const existingActivity = activities[activityIndex];
  const updatedActivity = {
    ...existingActivity,
    ...updates,
  };

  activities[activityIndex] = updatedActivity;
  await writeJsonArray(ACTIVITY_FILE_PATH, activities);

  return updatedActivity;
}

async function deleteActivity(activityId) {
  const activities = await readJsonArray(ACTIVITY_FILE_PATH);
  const activityIndex = activities.findIndex((item) => item.id === activityId);

  if (activityIndex === -1) {
    throw new HttpError(404, 'Activity not found.');
  }

  const [removedActivity] = activities.splice(activityIndex, 1);
  await writeJsonArray(ACTIVITY_FILE_PATH, activities);

  return removedActivity;
}

module.exports = {
  getAllActivity,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
