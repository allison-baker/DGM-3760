const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET request');
})

app.post('/', (req, res) => {
  res.send('POST request');
})

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
})
