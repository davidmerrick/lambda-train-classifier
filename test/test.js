import AWS from 'aws-sdk'
import bayes from 'bayes'

const s3 = new AWS.S3();

const S3_REGION = process.env.S3_REGION || "us-west-2";
const S3_BUCKET = process.env.S3_BUCKET;
const FILENAME = process.env.FILENAME;

let text = "foo";
let classification = "bar";

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