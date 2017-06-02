'use strict'

import AWS from "aws-sdk";
import bayes from "bayes";

const S3_REGION = process.env.S3_REGION || "us-west-2";
const S3_BUCKET = process.env.S3_BUCKET;
const FILENAME = process.env.FILENAME;

exports.handler = function index(event, context, callback){
    const s3 = new AWS.S3();

    let params = {
        Bucket: S3_BUCKET,
        Key: FILENAME
    };
    s3.getObject(params, (err, data) => {
        if(err){
            return callback(err);
        }

        let jsonData = data.Body;
        let classifier = bayes.fromJson(jsonData);

        let {text, classification} = event;

        classifier.learn(text, classification);
        let classifierJson = classifier.toJson();

        let params = {
            Body: classifierJson,
            ACL: "public-read",
            Bucket: S3_BUCKET,
            Key: FILENAME
        };
        s3.putObject(params, (err, data) => {
            if(err){
                return callback(err);
            }

            return callback(null, data.Body);
        });
    });
}