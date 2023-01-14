const express = require('express');
require('dotenv').config();
let app = express();

app.listen(process.env.PORT, () => console.log('Listening on port 3000'));