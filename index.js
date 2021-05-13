const express = require('express');
const fs = require('fs');
const jtoken = require('jsonwebtoken');
const app = express();
const port = process.env.PORT | 3000;

let router = express.Router();
app.use("/", router);
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.json({ message: 'Hellow World'});
});

router.post('/jwt', express.json(), (req, res)=> {

    let privFile = fs.readFileSync('priv.key', 'utf8');
    let privKey = Buffer.from(privFile, 'base64');

    let outToken = jtoken.sign(req.body,privKey,{
        algorithm: 'RS256'
    });

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(outToken);
});3

router.post('/verify', express.text(), (req, res)=> {
    let pubFile = fs.readFileSync('pub.key', 'utf8');
    let pubKey = Buffer.from(pubFile, 'base64');

    let outObj = jtoken.verify(req.body, pubKey, {algorithms: ["RS256"]});
    res.json(outObj);
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}.`);
});