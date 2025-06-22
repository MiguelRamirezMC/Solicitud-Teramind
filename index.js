require("dotenv").config();
const express = require("express");
const cors = require("cors");
const NetSuiteOauth = require("netsuite-tba-oauth");

const app = express();
// Trust proxy if behind a proxy (e.g., Railway)
app.set('trust proxy', true);

// === CORS Configuration ===
// Allow all origins; adjust origin array if you need to restrict
app.use(cors());
// Handle preflight requests for all routes
app.options('*', cors());

// === Parsing Middleware ===
app.use(express.json());

// === Logging Middleware ===
app.use((req, res, next) => {
  console.log(`REQ => ${req.method} ${req.originalUrl}`);
  next();
});

// === Healthcheck Endpoint ===
app.get('/', (req, res) => res.json({ status: 'ok' }));

// === API Router ===
const api = express.Router();
const BASE_URL = `https://${process.env.ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;
const { SCRIPT_ID, DEPLOY_ID, CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT } = process.env;

// GET list data
api.get('/getData', async (req, res) => {
  try {
    const lists = ['territorios', 'enfoques', 'industrias'];
    const result = {};
    for (const name of lists) {
      const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}&list=${name}`;
      const oauth = new NetSuiteOauth(url, 'GET', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
      const raw = await oauth.get();
      result[name] = typeof raw === 'string' ? JSON.parse(raw) : raw;
    }
    res.json(result);
  } catch (e) {
    console.error('Error GET /getData:', e);
    res.status(500).json({ error: e.message });
  }
});

// GET specific list
api.get('/listas/:name', async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}&list=${req.params.name}`;
    const oauth = new NetSuiteOauth(url, 'GET', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
    const raw = await oauth.get();
    res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.error('Error GET /listas/:name:', e);
    res.status(500).json({ error: e.message });
  }
});

// GET record by type and ID
api.get('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}&recordtype=${type}&id=${id}`;
    const oauth = new NetSuiteOauth(url, 'GET', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
    const raw = await oauth.get();
    res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.error(`Error GET /${req.params.type}/${req.params.id}:`, e);
    res.status(500).json({ error: e.message });
  }
});

// POST create prospecto (/send and /prospecto)
const createHandler = async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}`;
    const oauth = new NetSuiteOauth(url, 'POST', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
    const raw = await oauth.post(req.body);
    res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.error(`Error POST ${req.originalUrl}:`, e);
    res.status(500).json({ error: e.message });
  }
};
api.post('/send', createHandler);
api.post('/prospecto', createHandler);

// PUT update record
api.put('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}&put=1&recordtype=${type}&id=${id}`;
    const oauth = new NetSuiteOauth(url, 'POST', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
    const raw = await oauth.post(req.body);
    res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.error(`Error PUT /${req.params.type}/${req.params.id}:`, e);
    res.status(500).json({ error: e.message });
  }
});

// DELETE record
api.delete('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}&delete=1&recordtype=${type}&id=${id}`;
    const oauth = new NetSuiteOauth(url, 'POST', CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
    const raw = await oauth.post({});
    res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
  } catch (e) {
    console.error(`Error DELETE /${req.params.type}/${req.params.id}:`, e);
    res.status(500).json({ error: e.message });
  }
});

// Mount API
app.use('/api/v2/se', api);

// 404 Handler
app.use((req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.header('Access-Control-Allow-Origin', '*');
  res.status(500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
