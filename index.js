const express = require('express');
const app = express();
const cors = require('cors');
const videoRoutes = require('./routes/videos.js');

// example of middleware to allow posting using req.body
app.use(express.json());
app.use(cors());
app.use('/', videoRoutes);
app.use(express.static('public'));

app.listen(5050, () => {
  console.log('App listening at http://localhost:5050');
});
