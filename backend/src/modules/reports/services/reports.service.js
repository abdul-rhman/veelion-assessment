const path = require('node:path');

const { readJsonArray } = require('../../../utils/jsonStore');

const TASKS_FILE_PATH = path.join(process.cwd(), 'data', 'tasks.json');
const ACTIVITY_FILE_PATH = path.join(process.cwd(), 'data', 'activity.json');

const RECENT_ACTIVITY_WINDOW_DAYS = 7;
const RECENT_ACTIVITY_WINDOW_MS =
  RECENT_ACTIVITY_WINDOW_DAYS * 24 * 60 * 60 * 1000;

function buildStatusBreakdown(tasks) {
  return tasks.reduce(
    (byStatus, task) => {
      if (task.completed) {
        byStatus.done += 1;
      } else {
        byStatus.todo += 1;
      }

      return byStatus;
    },
    { todo: 0, 'in-progress': 0, done: 0 }
  );
}

function countRecentActivity(activity) {
  const windowStart = Date.now() - RECENT_ACTIVITY_WINDOW_MS;

  return activity.filter((entry) => {
    const timestamp = Date.parse(entry.when);
    return Number.isFinite(timestamp) && timestamp >= windowStart;
  }).length;
}

async function getTasksSummary() {
  const [tasks, activity] = await Promise.all([
    readJsonArray(TASKS_FILE_PATH),
    readJsonArray(ACTIVITY_FILE_PATH),
  ]);

  return {
    total: tasks.length,
    byStatus: buildStatusBreakdown(tasks),
    recentActivityCount: countRecentActivity(activity),
  };
}

module.exports = {
  getTasksSummary,
};
