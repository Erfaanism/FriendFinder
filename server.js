const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});