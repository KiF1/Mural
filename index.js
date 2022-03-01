const PORT = 3000;
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const apiRoute = require('./routes/api');
const router = require('./routes/api');

const options = {
    origin: ["http://localhost:3000", 
    "http://10.0.0.124:3000"],};

app.use(cors(options));

app.use('/api', apiRoute);
app.use('/', express.static(path.join(__dirname, 'public')));


app.listen(PORT, () =>{
console.log("ok", PORT)
});
