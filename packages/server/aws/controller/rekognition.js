const aws = require('aws-sdk')
const rekognition = aws.Rekognition();
aws.config.setPromisesDependency();
aws.config.update({
	region: config.region,
	accessKeyId: config.accessKeyID,
	secretAccessKey: config.secretKey,
});

exports.createCollection = () => {
    /* This operation creates a Rekognition collection for storing image data. */
    return new Promise((resolve, reject) => {
    var params = {
    CollectionId: "MissingPeople"
   };
   rekognition.createCollection(params, function(err, data) {
     if (err) return reject(err); // an error occurred
     else     return resolve(data);           // successful response
     /*
     data = {
      CollectionArn: "aws:rekognition:us-west-2:123456789012:collection/myphotos", 
      StatusCode: 200
     }
     */
   });
    })
}

exports.AddFace = (imageString,faceName) => {
    return new Promise((resolve, reject) => {
    var params = {
        CollectionId: 'MissingPeople', /* required */
        Image: { /* required */
          Bytes: imageString /* Strings will be Base-64 encoded on your behalf */,
        },
        DetectionAttributes: [
          DEFAULT,
          /* more items */
        ],
        ExternalImageId: faceName,
        MaxFaces: '3',
        QualityFilter: AUTO
      };
      rekognition.indexFaces(params, function(err, data) {
        if (err) return reject(err) // an error occurred
        else     return resolve(data) // successful response
      });
    })
}

exports.findFaces = (imageString) => {
    return new Promise((resolve, reject) => {
    var params = {
        CollectionId: 'MissingPeople', /* required */
        Image: { /* required */
          Bytes: imageString /* Strings will be Base-64 encoded on your behalf */,
        },
        FaceMatchThreshold: 80,
        MaxFaces: 3,
        QualityFilter: AUTO
      };
      rekognition.searchFacesByImage(params, function(err, data) {
        if (err) return reject(err); // an error occurred
        else     return resolve(data);           // successful response
      });
    })
}