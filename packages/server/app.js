require('dotenv').config();
const express = require('express');
const cors = require('cors');
const s3 = require('./aws/controller/s3');
const app = express();
const port = 3001;
const fileupload = require('express-fileupload');

const rekognition = require('./aws/controller/rekognition');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
}
app.listen(process.env.PORT || port, () => {
    console.log('app is running on port ' + port);
});

app.post('/create-collection', async function (req, res) {
    res.send(await rekognition.createCollection());
});

app.post('/find-face', async function (req, res) {
    try {
        var face = await rekognition.findFaces(req.files.face.data);
        var file = await s3.getFile(face.FaceMatches[0].Face.ImageId);
        res.send({ file: file.toString('base64'), name: face.FaceMatches[0].Face.ExternalImageId });
    } catch (err) {
        res.sendStatus(500);
    }
});

app.post('/add-face', async function (req, res) {
    var name = await rekognition.AddFace(req.files.face.data, req.body.name);
    res.send(await s3.uploadFile(req.files.face, name.FaceRecords[0].Face.ImageId));
});
module.exports = app;
