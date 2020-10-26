(accessKeyID = process.env.AWS_ACCESS_KEY),
	(secretKey = process.env.AWS_SECRET_KEY),
	(bucket = process.env.AWS_BUCKET),
	(region = process.env.AWS_REGION);

module.exports = {
	accessKeyID,
	secretKey,
	bucket,
	region,
};
