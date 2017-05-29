'use strict'

import Twitter from 'twitter'

let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

exports.handler = function index(event, context, callback){
    let screen_name = event.screen_name || process.env.SCREEN_NAME;
    let params = {screen_name: screen_name};
    client.get(`statuses/user_timeline`, params, (err, tweets, response) => {
        callback(null, tweets);
    });
}