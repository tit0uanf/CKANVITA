export { hoursDiff };
export { printDaysOrHoursMinutes };
export { dateDisplay };
export { hoursDisplay };
//print hours difference between iso-8601 date and now or days if superior to 24 hours
function printDaysOrHoursMinutes(date) {
  const now = new Date();
  const diff = new Date(date) - now;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  return hours > 24
    ? Math.floor(hours / 24) + ' day(s) left'
    : 'starting ' + hoursDiff(date);
}

//print exact hours and minute between now and iso-8601 date
function hoursDiff(date) {
  let now = new Date();
  let diff = new Date(date) - now;
  let hours = Math.floor(diff / 1000 / 60 / 60);
  let minutes = Math.floor((diff / 1000 / 60) % 60);
  if (minutes < 0 && hours < 0) return 'soon...';
  if (hours <= 0) return 'in ' + minutes + 'm';

  return 'in ' + hours + 'h ' + minutes + 'm';
}

function adjustDateByTimezone(date) {
  let dateObj = new Date(date);
  const timezoneOffset = dateObj.getTimezoneOffset();
  const adjustedTimestamp = dateObj.getTime() - timezoneOffset * 60 * 1000;
  dateObj = new Date(adjustedTimestamp);
  return dateObj;
}

//print date from iso to MM/DD
function dateDisplay(date) {
  let dateObj = adjustDateByTimezone(date);
  let month = (dateObj.getUTCMonth() + 1).toString();
  let day = dateObj.getUTCDate().toString();
  let hours = dateObj.getUTCHours();
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  return day + '/' + month;
}

function hoursDisplay(date) {
  let dateObj = adjustDateByTimezone(date);
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  if (minutes === 0) return hours + 'h00';
  if (minutes.toString().length === 1) {
    return hours + 'h0' + minutes;
  } else return hours + 'h' + minutes;
}
