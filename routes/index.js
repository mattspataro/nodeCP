var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//API STUFF
var CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;

// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = 'cb2fac42-cc81-4964-89ad-c55df486fe3a';

var apiInstance = new CloudmersiveImageApiClient.FaceApi();

router.post('/faces', function(req, res, next) {
    console.log('Begin API call...');
    var path = req.body.path;
    console.log("Path: " + path);
    var imageFile = Buffer.from(fs.readFileSync(path).buffer);
    console.log(imageFile);
    apiInstance.faceDetectGender(imageFile, function(error, data, response) {
        if (error) {
            console.error(error);
        }
        else {
            console.log('API called successfully!');
            console.log("People Identified: " + data.PeopleIdentified);
            res.status(200).json(data);
        }
    });
});

module.exports = router;
