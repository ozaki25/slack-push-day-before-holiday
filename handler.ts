import * as dayjs from 'dayjs';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { isHoliday } from './src/holidayUtil';
import { pushMessage } from './src/slackApi';

export const noticeDayBeforeHoliday: APIGatewayProxyHandler = async () => {
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
