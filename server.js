import { app } from './app.js';
import { db } from './db.js';
import { ObjectId } from 'bson';

// the start view
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// show the data
app.get('/show', (req, res) => {
  // get the data
  db.collection('users').find().toArray((err, results) => {
    if (err) return console.log(err);
    res.render('show.ejs', { data: results });
  });
});

// to add data
app.post('/show', (req, res) => {
  db.collection('users').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('salvo no banco de dados');

    // redirecting to the data view
    res.redirect('/show');
  });
});

// rout setup
app.route('/edit/:id')
.get((req, res) => {
  let id = req.params.id;

  // get one user and rendering the edit page
  db.collection('users').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err);
    res.render('edit.ejs', { data: result });
  });
})
.post((req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let species = req.body.species;

  // update one user
  db.collection('users').updateOne({ _id: ObjectId(id) }, {
    $set: {
      name: name,
      species: species
    }
  }, (err, result) => {
    if (err) return res.send(err);
    res.redirect('/show');
    console.log('Atualizado no banco de dados');
  });
});

app.route('/delete/:id')
.get((req, res) => {
  let id = req.params.id;

  // delete one user
  db.collection('users').deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log('Deletado do banco de Dados');
    res.redirect('/show');
  });
});
