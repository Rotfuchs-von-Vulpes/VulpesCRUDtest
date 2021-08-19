import { app } from './app.js';
import { db } from './db.js';
import { ObjectId } from 'bson';

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/show', (req, res) => {
  db.collection('test').find().toArray((err, results) => {
    if (err) return console.log(err);
    res.render('show.ejs', { data: results });
  });
});

app.post('/show', (req, res) => {
  db.collection('test').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('salvo no banco de dados');
    res.redirect('/show');
  })
});

app.route('/edit/:id')
.get((req, res) => {
  let id = req.params.id;

  db.collection('test').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err);
    res.render('edit.ejs', { data: result });
  })
})
.post((req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let species = req.body.species;

  db.collection('test').updateOne({ _id: ObjectId(id) }, {
    $set: {
      name: name,
      species: species
    }
  }, (err, result) => {
    if (err) return res.send(err);
    res.redirect('/show');
    console.log('Atualizado no banco de dados');
  })
})

app.route('/delete/:id')
.get((req, res) => {
  let id = req.params.id;

  db.collection('test').deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log('Deletado do banco de Dados');
    res.redirect('/show');
  })
})