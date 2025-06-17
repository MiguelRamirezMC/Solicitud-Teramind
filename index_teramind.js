// index_teramind.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const NetSuiteOauth = require("netsuite-tba-oauth");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const BASE_URL = `https://${process.env.ACCOUNT}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;
const SCRIPT = process.env.SCRIPT_ID;
const DEPLOY = process.env.DEPLOY_ID;
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const tokenId = process.env.TOKEN_ID;
const tokenSecret = process.env.TOKEN_SECRET;
const account = process.env.ACCOUNT;

app.get("/", (req, res) => res.json({ status: "ok" }));

const api = express.Router();

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
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

api.get("/listas/:listName", async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&list=${req.params.listName}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    res.json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

api.get("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "GET", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.get();
    res.json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

api.post("/prospecto", async (req, res) => {
  try {
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    res.json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

api.delete("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&delete=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post({});
    res.json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

api.put("/:recordtype/:id", async (req, res) => {
  try {
    const { recordtype, id } = req.params;
    const url = `${BASE_URL}?script=${SCRIPT}&deploy=${DEPLOY}&put=1&recordtype=${recordtype}&id=${id}`;
    const oauth = new NetSuiteOauth(url, "POST", consumerKey, consumerSecret, tokenId, tokenSecret, account);
    const raw = await oauth.post(req.body);
    res.json(typeof raw === "string" ? JSON.parse(raw) : raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use("/api/v2/se", api);
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
