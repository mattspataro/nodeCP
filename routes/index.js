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
    //var imageFile = Buffer.from(fs.readFileSync(req.body.photoObj).buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.
      apiInstance.faceDetectGender(req.body.photoObj, function(error, data, response) {
    // apiInstance.faceDetectGender(imageFile, function(error, data, response) {
        if (error) {
            console.error(error);
        }
        else {
            console.log('API called successfully!');
            res.send(data);
        }
    });
});


// router.get('/faces', function(req, res, next) {
//     console.log('Begin API call...');
//     var imageFile = Buffer.from(fs.readFileSync("./public/recordings/many.jpg").buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.
//     apiInstance.faceDetectGender(imageFile, function(error, data, response) {
//         if (error) {
//             console.error(error);
//         }
//         else {
//             console.log('API called successfully!');
//             res.send(data);
//         }
//     });
// });

module.exports = router;
