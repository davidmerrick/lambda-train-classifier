'use strict'

import Twitter from 'twitter'

let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let params = {screen_name: process.env.SCREEN_NAME};

exports.handler = function index(event, context, callback){
    client.get(`statuses/user_timeline`, params, (err, tweets, response) => {
        callback(tweets);
    });
}