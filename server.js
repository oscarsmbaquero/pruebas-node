import express from 'express';
// import bodyParser  from 'body-parser';
import './db.js';

import { Movie } from './models/Movie.js';

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Api de peliculas de Oscar!');
});

// Listado
router.get('/movies', async (req, res) => {
  const { genre } = req.query;

  let movies = [];
  if (genre) {
    movies = await Movie.find({ genre: genre }).exec();
  } else {
    movies = await Movie.find();
  }

  res.send(movies);
});
//listado por nombre
router.get('/movies/:name', async (req, res) => {
  const { name } = req.params;

 
    const movies = await Movie.find({ name: name }).exec();
    const found = movies.find(movie => movie.name === name);
 

  res.send(found);
});
//listado por genero
router.get('/movies/:genre', async (req, res) => {
  const { genre } = req.params;

 
    const movies = await Movie.find({ genre: genre }).exec();
    const found = movies.filter(movie => movie.genre === genre);
 

  res.send(found);
});



// Creación
// router.post('/movies', (req, res) => {
//   const body = req.body;

//   createMovie(body);

//   res.send('OK');
// });

// Detalle por ID
// router.get('/movies/:id', (req, res) => {
//   const { id } = req.params;
//   const movies = getMovies();
//   const found = movies.find(movie => movie.id === parseInt(id));

//   if (found) {
//     res.send(found);
//   } else {
//     res.status(404).send('Not found');
//   }
// });

// Detalle por NAME
// router.get('/movies/name/:name', (req, res) => {
//   const { name } = req.params;
//   const movies = getMovies();
//   const found = movies.find(movie => movie.name === name);

//   if (found) {
//     res.send(found);
//   } else {
//     res.status(404).send('Not found');
//   }
// });

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);


server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});