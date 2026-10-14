const path = require('node:path');

const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');

const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createActivity(body) {
  const payload = body || {};
  const list = await readJsonArray(ACTIVITY_FILE_PATH);
  const activity = {
    id: String(Date.now()),
    action: payload.action,
    info: payload.info,
    when: new Date().toISOString(),
  };

  list.push(activity);
  await writeJsonArray(ACTIVITY_FILE_PATH, list);
  return activity;
}

module.exports = {
  getAllActivity,
  createActivity,
};
