const express = require('express');
const cors = require('cors');
const { createIdentity } = require('./createIdentity');
const { createUserVc } = require('./createUserVc');
const { createAP } = require('./createAP');
const {getDDO} = require("./getDDO");
const https = require('https')
const fs = require('fs')

var privateKey  = fs.readFileSync('./HTTPS/idp.key', 'utf8');
var certificate = fs.readFileSync('./HTTPS/idp.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://localhost", "https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "token",
      "Authorization",
    ],
  })
);

app.post("/createIdentity", async function(req,res) {
    const { alias } = req.body.data;
    console.log("POST /createIdentity received, alias: "+alias)
    const did = await createIdentity(alias);
    if (did==="alias_used") res.send("alias_used");
    else res.json(did);
})

app.post("/getDDO", async function(req,res) {
  const { alias } = req.body.data;
  console.log("POST /getDDO received, alias: "+alias)
  const ddo = await getDDO(alias);
  if (ddo==="Not_found") res.send("Not_found");
  else res.json(ddo);
})


app.post("/createAP", async function(req,res) {
  const { alias } = req.body.data;
  console.log("POST /createAP received, alias: "+alias)
  const did = await createAP(alias);
  if (did==="alias_used") res.send("alias_used");
  else res.json(did);
})

app.post("/createUserVC", async function(req,res) {
  console.log("POST /createUserVC received");
  const { name, surname, university, userAlias } = req.body.data;
  console.log("Params: "+name+", "+surname+", "+university+", "+userAlias);
  const vc = await createUserVc(name, surname, university, userAlias);
  res.json(vc);
})

const port = 8443;
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port,()=>{
  console.log(`Identity Provider is listening at port ${port}`)
})

