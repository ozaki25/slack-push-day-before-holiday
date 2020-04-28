## slack-push-day-before-holiday

### 概要

- 毎日昼12時にLambdaが実行されます
- 当日が平日で翌日が土日祝日の場合にSlackにメッセージが投稿されます

### 使い方

#### セットアップ

```
git clone https://github.com/ozaki25/slack-push-day-before-holiday.git
cd slack-push-day-before-holiday
yarn
```

#### DotEnvのセット

- `.env.example`を参考にslackのtokenや投稿先チャンネルを設定する

```
SLACK_API_TOKEN_DEV=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SLACK_CHANNEL_DEV=dev-channel
SLACK_USERNAME_DEV=[DEV]明日は休みだよBot
SLACK_API_TOKEN_PROD=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SLACK_CHANNEL_PROD=prod-channel
SLACK_USERNAME_PROD=明日は休みだよBot
```

#### Local

- 以下のコマンドでローカル実行できる

```sh
yarn invoke
```

- 当日が平日で翌日が土日祝日であれば`SLACK_CHANNEL_DEV`に設定したチャンネルに通知が飛ぶ

#### AWS(dev)

- 以下のコマンドでAWSへdevモードでデプロイできる

```sh
yarn deploy
```

- 以下のコマンドで実行できる

```sh
yarn invoke:aws
```

- 当日が平日で翌日が土日祝日であれば`SLACK_CHANNEL_DEV`に設定したチャンネルに通知が飛ぶ
- devモードではLambdaのスケジュールは入れていないので自動実行はされない

#### AWS(prod)

- 以下のコマンドでAWSへprodモードでデプロイできる

```sh
yarn deploy:prod
```

- prodモードではLambdaのスケジュールの設定が入っているので毎日昼の12時に実行される
