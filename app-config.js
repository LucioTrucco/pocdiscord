"use strict";

module.exports = {
    aws : {
        region :  'us-east-2',
        accessKeyId : process.env.AWS_ACCESS_KEY_ID ? process.env.AWS_ACCESS_KEY_ID : '',
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY ? process.env.AWS_SECRET_ACCESS_KEY : '',
        firehoseStream : process.env.NODE_AWS_STREAM ? process.env.NODE_AWS_STREAM : 'discord-events-fh',
        maxRetries: 3,
        httpOptions: { timeout: 30000, connectTimeout: 5000 },
    }
};