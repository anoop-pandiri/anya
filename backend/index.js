const express = require('express');

const app = express();


const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/anya', (err, client) => {
  if (err) throw err

  const db = client.db('anya');

});



app.get('/', (req, res) => {
    res.json('OUI');
});

app.listen(3001, () => {
    console.log('Listening...');
});