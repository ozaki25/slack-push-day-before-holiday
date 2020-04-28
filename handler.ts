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

const message = '明日は休みだよ！残りの仕事も頑張ろう！';

export const hello: APIGatewayProxyHandler = async () => {
  pushMessage({ text: message });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello' }),
  };
};
