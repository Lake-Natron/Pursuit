const express = require('express');
require('dotenv').config();
let app = express();
app.use(express.static(__dirname + '/../public/'));
app.listen(process.env.PORT, () => console.log('Listening on port 3000'));