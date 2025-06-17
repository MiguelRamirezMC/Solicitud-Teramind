require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const hpp = require("hpp");
const NetSuiteOauth = require("netsuite-tba-oauth");

const app = express();

// --- Middlewares ---
// Logging each request (for debugging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Security headers
app.use(helmet());

// Parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// XSS protection
app.use(xss());

// HTTP parameter pollution protection
app.use(hpp());

// CORS - adjust origin list as needed
app.use(cors({ origin: true }));

// --- NetSuite configuration ---
const BASE_URL = `https://${process.env.ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;
const SCRIPT = process.env.SCRIPT_ID;
const DEPLOY = process.env.DEPLOY_ID;
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const tokenId = process.env.TOKEN_ID;
const tokenSecret = process.env.TOKEN_SECRET;
const account = process.env.ACCOUNT;

// --- Health check route ---
app.get("/", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// --- API Router ---
const api = express.Router();

// GET multiple lists
api.get("/getData", async (req, res) => {
  try {
    const lists = ["territorios", "enfoques", "industrias"];
    const result = {};
    for (const name of lists) {
      const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${name}`;
      const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
      const raw = await oauth.get();
      result[name] = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// GET a specific list by name
api.get("/listas/:listName", async (req, res) => {
  try {
    const { listName } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${listName}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return res.json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// GET a record by type and id
api.get("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return res.json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// POST a new prospect record
api.post("/prospecto", async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return res.json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// DELETE a record by type and id
api.delete("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&delete=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post({});
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return res.json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// PUT/update a record by type and id
api.put("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&put=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return res.json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

// Mount API router under /api
app.use("/api", api);

// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.originalUrl} no encontrada` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
