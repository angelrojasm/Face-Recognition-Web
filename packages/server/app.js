const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
require('express-fileupload')
const rekognition = require('./aws/controller/rekognition')

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));
}
app.listen(process.env.PORT || port, () => {
	console.log('app is running on port ' + port);
});

app.post('/create-collection', async function (req, res) {
	res.send(await rekognition.createCollection())
});

app.post('/find-face', async function (req, res) {
	res.send(await rekognition.findFaces(req.files.face));
});

app.post('/add-face', async function(req,res) {
	res.send(await rekognition.AddFace(req.files.face, req.body.name))
})
module.exports = app;
