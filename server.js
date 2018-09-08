// meant for production - for development use the dev server this project comes with.

const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('./docroot/'))

app.get('/', function (req, res) {
  res.render('index.html')
})

app.listen(port, () => {
  console.log(`Web server listening on: ${port}`);
});

module.exports = app;
