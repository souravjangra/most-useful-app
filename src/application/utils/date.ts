export const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 *
 * @param start startDate of type Date
 * @param end endDate of type Date
 * @returns random date generated of type Date
 */
export function randomDate(start: any, end: any) {
  var date = new Date(+start + Math.random() * (end - start));

  return date;
}

/**
 *
 * @param millis date value given in terms of milliseconds
 * @returns minutes calculated from milliseconds data
 */
export function millisToMinutes(millis: number) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

/**
 *
 * @param millis date value given in terms of milliseconds
 * @returns hours calculated from milliseconds data
 */
export function millisToHours(millis: number) {
  var hours = Math.floor(millis / (1000 * 60 * 60));
  return hours;
}

export function roundToNearestMinutes(date: number, minutes = 15) {
  const ms = 1000 * 60 * minutes;

  return new Date(Math.ceil(date) * ms);
}

export const getLastNMonths = (n: number = 6) => {
  const d = new Date();
  const currentMonth = d.getMonth();

  let result = [];
  for (let i = n; i > 0; i--) {
    result.push(MONTHS[currentMonth - i]);
  }
  return result;
};

export function getThisWeekDates() {
  const current = new Date();
  var week = [];
  var first = current.getDate() - current.getDay() + 1;
  current.setDate(first);
  current.setHours(0, 0, 0, 0);

  for (var i = 0; i < 7; i++) {
    week.push(new Date(+current));
    current.setDate(current.getDate() + 1);
  }
  return week;
}

