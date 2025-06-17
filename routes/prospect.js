// routes/prospecto.js
const express = require('express');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();

const {
  ACCOUNT,
  SCRIPT,
  DEPLOY,
  CONSUMERKEY,
  CONSUMER_SECRET,
  TOKEN_ID,
  TOKEN_SECRET
} = process.env;

const oauth = OAuth({
  consumer: { key: CONSUMERKEY, secret: CONSUMER_SECRET },
  signature_method: 'HMAC-SHA256',
  hash_function(base_string, key) {
    return crypto.createHmac('sha256', key).update(base_string).digest('base64');
  },
});

router.post('/prospecto', async (req, res) => {
  try {
    const url = `https://${ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=${SCRIPT}&deploy=${DEPLOY}`;
    const request_data = { url, method: 'POST', data: req.body };
    const authHeader = oauth.toHeader(
      oauth.authorize(request_data, { key: TOKEN_ID, secret: TOKEN_SECRET })
    );

    const netsuiteRes = await axios.post(url, req.body, {
      headers: {
        ...authHeader,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(netsuiteRes.data);
  } catch (err) {
    console.error('Error al llamar al Restlet:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Error creando prospecto en NetSuite',
      details: err.response?.data || err.message
    });
  }
});

module.exports = router;
