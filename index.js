const express = require('express');
const cors = require('cors');
const { createIdentity } = require('./createIdentity');
const { createVC } = require('./createVC');
const { createUserVc } = require('./createUserVc');
const { createAP } = require('./createAP');
const app = express();
const port = 5000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost", "http://localhost:3000", "http://localhost:3001"],
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
    console.log("Post request received, alias: "+alias)
    const did = await createIdentity(alias);
    console.log("DID: "+JSON.stringify(did));
    if (did==="alias_used") res.send("alias_used");
    else res.json(did);
})

app.post("/createAP", async function(req,res) {
  console.log("Qui arriva");
  const { alias } = req.body.data;
  console.log("POST request received on /createAP, alias: "+alias)
  const did = await createAP(alias);
  console.log("DID: "+JSON.stringify(did));
  if (did==="alias_used") res.send("alias_used");
  else res.json(did);
})

app.post("/universityCred", async function(req,res) {
    console.log("POST received");
    const { name, surname, university, userAlias, alias } = req.body.data;
    console.log("Params: "+name+", "+surname+", "+university+", "+userAlias+", "+alias)
    const vc = await createVC(name, surname, university, alias);
    console.log("VC: "+JSON.stringify(vc));
    res.json(vc);
})

app.post("/createUserVC", async function(req,res) {
  console.log("POST /createUserVC received");
  const { name, surname, university, userAlias } = req.body.data;
  console.log("Params: "+name+", "+surname+", "+university+", "+userAlias);
  const vc = await createUserVc(name, surname, university, userAlias);
  console.log("VC: "+JSON.stringify(vc));
  res.json(vc);
})

app.get("/", function(req, res) {
    console.log("GET received")
})

app.listen(port, () => {
  console.log(`Identity Provider started on port : ${port}`);
});
