import { app } from './app.js';
import { MongoClient } from 'mongodb';
import 'dotenv/config';

// create a database context

const port = 3000;

let db;
MongoClient.connect(process.env.URL, (err, client) => {
  if (err) return console.log(err);
  // set the database name, you can change this
  db = client.db('myFirstDatabase');

  // when the database connection is successful, initialize the server
  app.listen(port, function() {
    console.log(`servidor rodando na porta ${port}`);
  });
})

export { db };