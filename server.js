const express = require("express");
const app = express();
const mongoose = require('./mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./routes/route');

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', route);

var server = app.listen(8081, () => {
   var port = server.address().port
   console.log("Server is listening on port %s", port);    
})
