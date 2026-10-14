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

  const trimmed = payload.action.trim();
  if (!trimmed) {
    throw new HttpError(400, '"action" cannot be empty.');
  }

  normalized.action = trimmed;
}

function normalizeInfoIfPresent(payload, normalized) {
  if (!Object.hasOwn(payload, 'info')) {
    return;
  }

  if (typeof payload.info !== 'string') {
    throw new HttpError(400, '"info" must be a string.');
  }

  const trimmed = payload.info.trim();
  if (!trimmed) {
    throw new HttpError(400, '"info" cannot be empty.');
  }

  normalized.info = trimmed;
}

function validateCreateActivity(payload) {
  validatePayloadShape(payload);
  ensureNoUnknownFields(payload);

  const normalized = {};
  normalizeActionIfPresent(payload, normalized);
  normalizeInfoIfPresent(payload, normalized);

  // Both optional per API, but if provided must be valid strings
  return normalized;
}

module.exports = {
  validateCreateActivity,
};
