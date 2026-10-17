const HttpError = require('../../../utils/httpError');

const ALLOWED_FIELDS = ['action', 'info'];

function validatePayloadShape(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new HttpError(400, 'Body must be a JSON object.');
  }
}

function ensureNoUnknownFields(payload) {
  const unknownFields = Object.keys(payload).filter(
    (field) => !ALLOWED_FIELDS.includes(field)
  );

  if (unknownFields.length > 0) {
    throw new HttpError(400, 'Body contains unsupported fields.', {
      unsupportedFields: unknownFields,
    });
  }
}

function normalizeActionIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'action')) {
    return;
  }

  if (typeof payload.action !== 'string') {
    throw new HttpError(400, '"action" must be a string.');
  }

  const trimmedAction = payload.action.trim();
  if (!trimmedAction) {
    throw new HttpError(400, '"action" cannot be empty.');
  }

  normalized.action = trimmedAction;
}

function normalizeInfoIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'info')) {
    return;
  }

  if (typeof payload.info !== 'string') {
    throw new HttpError(400, '"info" must be a string.');
  }

  const trimmedInfo = payload.info.trim();
  if (!trimmedInfo) {
    throw new HttpError(400, '"info" cannot be empty.');
  }

  normalized.info = trimmedInfo;
}

function validateCreateActivity(payload) {
  validatePayloadShape(payload);
  ensureNoUnknownFields(payload);

  const normalized = {};
  normalizeActionIfPresent(payload, normalized);
  normalizeInfoIfPresent(payload, normalized);

  if (!Object.hasOwn(normalized, 'action')) {
    throw new HttpError(400, '"action" is required.');
  }

  return normalized;
}

function validateUpdateActivity(payload) {
  validatePayloadShape(payload);
  ensureNoUnknownFields(payload);

  const normalized = {};
  normalizeActionIfPresent(payload, normalized);
  normalizeInfoIfPresent(payload, normalized);

  if (Object.keys(normalized).length === 0) {
    throw new HttpError(400, 'Provide at least one updatable field.');
  }

  return normalized;
}

module.exports = {
  validateCreateActivity,
  validateUpdateActivity,
};
