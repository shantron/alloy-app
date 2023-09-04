const express = require('express');
const app = express();
const axios = require('axios');
require("dotenv").config();

app.use(express.json());

const workflowSecret = process.env.WORKFLOW_SECRET;
const workflowToken = process.env.WORKFLOW_TOKEN;
const authorization = "Basic " + Buffer.from(`${workflowToken}:${workflowSecret}`, "utf8").toString("base64");


app.post('/submit', async (req, res) => {
  try {
    console.log("req.body", req.body);
    const apiUrl = process.env.API_URL;

    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(
      apiUrl,
      req.body,
      { headers }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error forwarding data to external API:', error);
    res.status(500).json({ error: 'Unable to submit the application. Please refresh the page or contact support.' });
  }
});

app.get('/', (req, res) => {
    res.send('Hello you!');
  });

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT || 5001}`);
});