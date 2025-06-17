
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const xss = require("xss-clean");
const hpp = require("hpp");
const NetSuiteOauth = require("netsuite-tba-oauth");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json());

// Configuración de NetSuite Restlet
const BASE_URL = `https://${process.env.ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;
const SCRIPT = process.env.SCRIPT_ID;
const DEPLOY = process.env.DEPLOY_ID;
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const tokenId = process.env.TOKEN_ID;
const tokenSecret = process.env.TOKEN_SECRET;
const account = process.env.ACCOUNT;


const seRouter = express.Router();


seRouter.get("/getData", async (req, res) => {
  try {
    const lists = ["territorios", "enfoques", "industrias"];
    const result = {};
    for (const name of lists) {
      const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${name}`;
      const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
      const raw = await oauth.get();
      result[name] = typeof raw === "string" ? JSON.parse(raw) : raw;
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


seRouter.get("/listas/:listName", async (req, res) => {
  try {
    const { listName } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${listName}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


seRouter.get("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


seRouter.post("/prospecto", async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


seRouter.delete("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&delete=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post({});
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


seRouter.put("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&put=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
