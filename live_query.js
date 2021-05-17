$(function(){

    // 相关文档: 
    // https://docs.parseplatform.org/js/guide/#livequeryclient
    // https://github.com/parse-community/parse-server-example

    // TODO: 按需配置你自己的, 
    // 创建 Parse Server 时的配署
    const APP_ID = 'FtDHmHQ2wNeHhn8hCZFwatp0CO8eQ7tf';
    const LIVE_QUERY_SERVER_URL = 'wss://parse.21cloudbox.com';
    const JS_CLIENT_KEY = 'ndNajalmUjlq3jDx8Qw3vl6gOr10WonS';

    // 配置 Live Query
    let LiveQueryClient = Parse.LiveQueryClient;
    let client = new LiveQueryClient({
      applicationId: APP_ID,
      serverURL: LIVE_QUERY_SERVER_URL,
      javascriptKey: JS_CLIENT_KEY
    });

    // 连入
    client.open();

    // 订阅
    var query = new Parse.Query('GameScore');
    query.ascending('createdAt').limit(5);
    var subscription = client.subscribe(query);

    subscription.on('create', obj => {
        console.log('On create event');
        console.log(obj);
        const score = obj.get('score');
        const playerName = obj.get('playerName');
        const cheatMode = obj.get('cheatMode');
        // console.log(score, playerName, cheatMode);
        const newResult = `playerName=${playerName}, score=${score}, cheatMode=${cheatMode}`;
        $('#parse-live-result').val(newResult + '\n' + $('#parse-live-result').val());
    });
});