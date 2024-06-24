const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST endpoint for speed test using fast.com
router.post('/speedTest', async (req, res) => {
    try {
        const startTime = Date.now(); // Capture start time
        const response = await axios.get('https://fast.com');
        const endTime = Date.now(); // Capture end time
        const latency = endTime - startTime; // Calculate latency

        let connectionQuality;
        if (latency < 100) {
            connectionQuality = 'Good'; // Latency less than 100 ms is considered good
        } else if (latency < 300) {
            connectionQuality = 'Medium'; // Latency between 100 ms and 300 ms is considered medium
        } else {
            connectionQuality = 'Bad'; // Latency greater than or equal to 300 ms is considered bad
        }

        console.log('Latency:', latency, 'ms');
        console.log('Connection quality:', connectionQuality);

        res.json({ latency, connectionQuality });
    } catch (error) {
        console.error('Error occurred during speed test:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        res.status(500).json({ error: 'Error occurred during speed test' });
    }
});

module.exports = router;
