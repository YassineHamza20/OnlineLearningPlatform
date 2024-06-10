const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const axios = require('axios')



router.post('/ChatBot', auth, async(req, res) => {
    const {
        data
    } = req.body

    console.log("data: ", data);
    try {
        
        const response = await axios.post('http://127.0.0.1:8000/service/chatBot/',
            data
         );
        console.log(response.data.data.text);
        res.status(200).json({message: response.data.data.text})
    }catch(err) {
        //console.log("service server error: ",err)
        res.status(500).json({message: "Internal Server Error"})
    }


})

module.exports = router