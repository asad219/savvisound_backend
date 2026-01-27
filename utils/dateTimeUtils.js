/**
 * Format a Date object as date-only string (YYYY-MM-DD).
 * Returns null if input is falsy or not a valid Date.
 *
 * @param {Date|null|undefined} date
 * @returns {string|null}
 */
const formatDateOnly = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().split('T')[0];
};

/**
 * Format a Date object as time-only string (HH:mm:ss) in 24-hour format.
 * Returns null if input is falsy or not a valid Date.
 *
 * @param {Date|null|undefined} date
 * @returns {string|null}
 */
const formatTimeOnly = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().split('T')[1].slice(0, 8);
};

/**
 * Parse a date-only string (YYYY-MM-DD) into a Date object at midnight UTC.
 * Returns null if input is falsy or invalid.
 *
 * @param {string|null|undefined} dateString
 * @returns {Date|null}
 */
const convertDateOnlyToDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  const date = new Date(`${dateString}T00:00:00.000Z`);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Parse a time-only string (HH:mm:ss) into a Date object using base date 1900-01-01.
 * Returns null if input is falsy or invalid.
 *
 * @param {string|null|undefined} timeString
 * @returns {Date|null}
 */
const convertTimeOnlyToDate = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    return null;
  }

  const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
  const match = timeString.match(timeRegex);
  if (!match) {
    return null;
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const seconds = parseInt(match[3], 10);

  if (
    hours < 0 || hours > 23 ||
    minutes < 0 || minutes > 59 ||
    seconds < 0 || seconds > 59
  ) {
    return null;
  }

  const date = new Date('1900-01-01T00:00:00.000Z');
  date.setUTCHours(hours, minutes, seconds, 0);
  return date;
};

module.exports = {
  formatDateOnly,
  formatTimeOnly,
  convertDateOnlyToDate,
  convertTimeOnlyToDate,
};

