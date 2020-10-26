const aws = require('aws-sdk');
const config = require('../config/config');
const s3Bucket = config.bucket;
aws.config.setPromisesDependency();
aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyID,
	secretAccessKey: config.secretKey,
});

const s3 = new aws.S3();

exports.uploadFile = (file, fileName) => {
	return new Promise((resolve, reject) => {
		let fileParts = file.name.split('.');
		let fileType = fileParts[1];

		s3.putObject(
			{
				Bucket: s3Bucket,
				Key: fileName,
				ACL: 'public-read',
				Body: file.data,
				Metadata: { type: fileType },
			},
			function (err) {
				if (err) {
					return reject(err);
				} else {
					return resolve('Ok');
				}
			}
		);
	});
};

exports.getFile = (fileName) => {
    return new Promise((resolve, reject) => {
    s3.getObject(
        {
            Bucket: s3Bucket,
            Key: fileName,
        },
        (err, data) => {
            if (err) {
                return reject('No such file name found.');
            } else {
                return resolve(data.Body);
            }
        }
    );
})
};
