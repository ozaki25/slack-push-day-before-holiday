import fetch from 'node-fetch';
import * as dayjs from 'dayjs';
import { WebClient } from '@slack/web-api';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

const { SLACK_API_TOKEN, SLACK_CHANNEL, SLACK_USERNAME } = process.env;

const slackClient = new WebClient(SLACK_API_TOKEN);

const pushMessage = async ({ text }) => {
  const result = await slackClient.chat.postMessage({
    text,
    channel: SLACK_CHANNEL,
    username: SLACK_USERNAME,
    unfurl_links: true,
  });
  console.log({ result });
};

const getHolidays = async () => {
  const res = await fetch('https://holidays-jp.github.io/api/v1/date.json');
  return res.json();
};

const isHoliday = async (date: dayjs.Dayjs) => {
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

export const hello: APIGatewayProxyHandler = async () => {
  const today = dayjs();
  const tomorrow = today.add(1, 'day');
  console.log({ today: today.toJSON(), tomorrow: tomorrow.toJSON() });

  if (await isHoliday(today)) {
    return { statusCode: 200, body: 'Today is Holiday!!!' };
  }
  if (!(await isHoliday(tomorrow))) {
    return { statusCode: 200, body: "Let's work tomorrow" };
  }

  await pushMessage({ text: '明日は休みだよ！残りの仕事も頑張ろう！' });
  return { statusCode: 200, body: 'Tomorrow is Holiday!!!' };
};
