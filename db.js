import { app } from './app.js';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

let db;
MongoClient.connect(process.env.URL, (err, client) => {
  if (err) return console.log(err);
  db = client.db('myFirstDatabase');

  app.listen(3000, function() {
    console.log('servidor rodando na porta 3000');
  });
})

export { db };