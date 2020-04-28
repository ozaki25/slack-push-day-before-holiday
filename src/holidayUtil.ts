import fetch from 'node-fetch';
import * as dayjs from 'dayjs';

const getHolidays = async () => {
  const res = await fetch('https://holidays-jp.github.io/api/v1/date.json');
  return res.json();
};

export const isHoliday = async (date: dayjs.Dayjs) => {
  const formattedDate = date.format('YYYY-MM-DD');

  if (date.day() === 0) {
    console.log(`${formattedDate} is Sunday`);
    return true;
  }

  if (date.day() === 6) {
    console.log(`${formattedDate} is Saturday`);
    return true;
  }

  const holidays = await getHolidays();

  if (Object.keys(holidays).includes(formattedDate)) {
    console.log(`${formattedDate} is Holiday`);
    return true;
  }

  console.log(`${formattedDate} is Weekday`);
  return false;
};
