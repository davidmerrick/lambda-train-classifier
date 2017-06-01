'use strict'

import AWS from 'aws-sdk'
import bayes from 'bayes'
import axios from 'axios'

const S3_REGION = process.env.S3_REGION || "us-west-2";
const S3_BUCKET = process.env.S3_BUCKET;
const FILENAME = process.env.FILENAME;

exports.handler = function index(event, context, callback){
    let text = event.text;
    let classification = event.classification;

    const s3 = new AWS.S3();

    let params = {
        Bucket: S3_BUCKET,
        Key: FILENAME
    };
    s3.getObject(params, (err, data => {
       if(err){
           return callback(err);
       }

       console.log(data);
    }));
}