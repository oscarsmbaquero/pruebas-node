//acabado parte I
import express from 'express';
// import bodyParser from "body-parser";
import { connection } from './db.js';

import { cinemaRoutes } from './routes/cinema.routes.js';
import { moviesRoutes } from './routes/movies.routes.js';

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Api de peliculas de Oscar!');
});
// Middlewares
router.use(express.json());
router.use(express.urlencoded({extended: false}));




// Routes
server.use('/movies', moviesRoutes);
server.use('/cinemas', cinemaRoutes);

// Crearemos un middleware para cuando no encontremos la ruta que busquemos
server.use('*', (req, res, next) => {
  const error = new Error('Route not found'); 
  error.status = 404;
  next(error); // Lanzamos la función next() con un error
});

server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});