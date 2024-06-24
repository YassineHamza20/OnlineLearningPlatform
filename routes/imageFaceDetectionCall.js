const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const roleCheck = require('../middleware/roleCheck')
const axios = require('axios')
const FormData = require('form-data');
const fileUpload = require('express-fileupload');

router.use('/imageFaceDetection', fileUpload());

router.post('/imageFaceDetection', auth, roleCheck(["Tutor"]), async (req, res) => {
    //checking whether the image is sent or not
    if (!req.files || !req.files.image) {
        console.log("error fichier server 1");
        return res.status(400).json({ error: 'Image file not provided' });
    }

    const imageFile = req.files.image;
    console.log(req.files.image);

    try {
        //send the image to the django server 
        const formData = new FormData();
        formData.append('image', imageFile.data, {
            filename: imageFile.name,
            contentType: imageFile.mimetype,
            knownLength: imageFile.size
        });
        const response = await axios.post('http://127.0.0.1:8000/service/recognize/',
         formData
         );
        console.log(response);
        res.status(200).json({message: response.data.faces})
    }catch(err) {
        console.log("service server error: ",err)
        res.status(500).json({message: "Internal Server Error2"})
    }

})

module.exports = router