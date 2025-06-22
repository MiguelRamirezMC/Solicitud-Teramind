require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NetSuiteOauth = require('netsuite-tba-oauth');

// Validar variables de entorno
const requiredVars = [
  'ACCOUNT',
  'SCRIPT',
  'DEPLOY',
  'CONSUMERKEY',
  'CONSUMER_SECRET',
  'TOKEN_ID',
  'TOKEN_SECRET'
];
const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length) {
  console.error('🚨 Faltan variables de entorno:', missing.join(', '));
  process.exit(1);
}

// Desestructurar variables
const {
  ACCOUNT,
  SCRIPT,
  DEPLOY,
  CONSUMERKEY,
  CONSUMER_SECRET,
  TOKEN_ID,
  TOKEN_SECRET,
  PORT = 3000
} = process.env;

const BASE_URL = `https://${ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;

// Helper para instanciar OAuth
function createOAuth(url, method) {
  return new NetSuiteOauth(
    url,
    method,
    CONSUMERKEY,
    CONSUMER_SECRET,
    TOKEN_ID,
    TOKEN_SECRET,
    ACCOUNT
  );
}

// Middleware genérico para manejo de errores
function wrapAsync(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (e) {
      console.error(`🔥 Error en ${req.method} ${req.originalUrl}:`, e.stack || e);
      res.status(500).json({ error: 'Error interno, revisa los logs' });
    }
  };
}

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

// Ruta de salud
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Rutas de API
const api = express.Router();

api.get('/getData', wrapAsync(async (req, res) => {
  const lists = ['territorios', 'enfoques', 'industrias'];
  const result = {};
  for (const name of lists) {
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${name}`;
    const oauth = createOAuth(url, 'GET');
    const raw = await oauth.get();
    result[name] = typeof raw === 'string' ? JSON.parse(raw) : raw;
  }
  res.json(result);
}));

api.get('/listas/:listName', wrapAsync(async (req, res) => {
  const { listName } = req.params;
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${listName}`;
  const oauth = createOAuth(url, 'GET');
  const raw = await oauth.get();
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

api.get('/:recordtype/:id', wrapAsync(async (req, res) => {
  const { recordtype, id } = req.params;
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&recordtype=${recordtype}&id=${id}`;
  const oauth = createOAuth(url, 'GET');
  const raw = await oauth.get();
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

api.post('/send', wrapAsync(async (req, res) => {
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}`;
  const oauth = createOAuth(url, 'POST');
  const raw = await oauth.post(req.body);
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

api.post('/prospecto', wrapAsync(async (req, res) => {
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}`;
  const oauth = createOAuth(url, 'POST');
  const raw = await oauth.post(req.body);
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

api.delete('/:recordtype/:id', wrapAsync(async (req, res) => {
  const { recordtype, id } = req.params;
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&delete=1&recordtype=${recordtype}&id=${id}`;
  const oauth = createOAuth(url, 'POST');
  const raw = await oauth.post({});
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

api.put('/:recordtype/:id', wrapAsync(async (req, res) => {
  const { recordtype, id } = req.params;
  const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&put=1&recordtype=${recordtype}&id=${id}`;
  const oauth = createOAuth(url, 'POST');
  const raw = await oauth.post(req.body);
  res.json(typeof raw === 'string' ? JSON.parse(raw) : raw);
}));

// Montar rutas
app.use('/api/v2/se', api);

// Handler 404
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
