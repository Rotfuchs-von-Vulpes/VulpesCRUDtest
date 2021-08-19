import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

export { app };