require("dotenv").config();
const express = require("express");
const cors = require("cors");
const NetSuiteOauth = require("netsuite-tba-oauth");

const app = express();
app.set('trust proxy', true);

// === CORS GLOBAL ===
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));
app.options('*', cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

const router = express.Router();
const BASE_URL = `https://${process.env.ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;
const { SCRIPT_ID, DEPLOY_ID, CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT } = process.env;

function buildOauth(method, extraParams = '') {
  const url = `${BASE_URL}?script=${SCRIPT_ID}&deploy=${DEPLOY_ID}${extraParams}`;
  return new NetSuiteOauth(url, method, CONSUMERKEY, CONSUMER_SECRET, TOKEN_ID, TOKEN_SECRET, ACCOUNT);
}

router.get('/getData', async (req, res) => {
  try {
    const lists = ['territorios', 'enfoques', 'industrias'];
    const result = {};
    for (const list of lists) {
      const oauth = buildOauth('GET', `&list=${list}`);
      const raw = await oauth.get();
      result[list] = typeof raw === 'string' ? JSON.parse(raw) : raw;
    }
    res.json(result);
  } catch (err) {
    console.error('GET /getData error:', err);
    res.status(500).json({ error: 'Ocurrió un error al obtener los datos.' });
  }
});

async function handleCreateProspect(req, res) {
  try {
    const oauth = buildOauth('POST');
    const raw = await oauth.post(req.body || {});
    const response = typeof raw === 'string' ? JSON.parse(raw) : raw;
    res.json(response);
  } catch (e) {
    console.error(`POST ${req.originalUrl} error:`, e);
    res.status(500).json({ error: 'No se pudo crear el prospecto.' });
  }
}

router.post('/send', handleCreateProspect);
router.post('/prospecto', handleCreateProspect);

app.use('/api/v2/se', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.set('Access-Control-Allow-Origin', '*');
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
