const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const router = express.Router();

app.use(router);

router.get('/haha', (req, res) => {
  res.cookie('hi', '100');
  res.send('Hello World! /haha');
});
router.get('/haha/good', (req, res) => res.send('Hello World! /haha/good'));
router.post('/webhooks/cloudflare-stream/upload-finished', (req, res) => {
  console.log('req header', req.headers);
  console.log('req', req);
  res.send('got it');
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
