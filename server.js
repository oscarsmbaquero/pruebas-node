import express from 'express';
import bodyParser from "body-parser";
// import './styles/style.css';
// import cors from "cors";
import './db.js';


import { Movie } from './models/Movie.js';

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
// router.use(express.static('./styles'));
// router.use(express.static('files'));
// router.use(cors());
// router.use(express.json());

// router.get('/', (req, res) => {
//   res.send('Api de peliculas de Oscar!');
// });

// Listado
/*let movie = new Movie();
  movie.id = req.body.id;
  movie.name = req.body.name;
  movie.genre = req.body.genre;*/

router.get('/movies', async (req, res) => {//req me trae info que queremos pasar a la query
  //console.log(req)
  const { genre } = req.query;// lo meto en la variable genre  
  let movies = [];//creo array vacio donde introducire los datos extraudos de la bd
  if (genre) {
    movies = await Movie.find({ genre: genre }).exec();//busco si encuentro algo 
    debugger

  } else {
    movies = await Movie.find();//pagina en blanco sino he encontrado nada
  }
  // for (let i = 0; i < movies.length; i++) {
  //   const element = movies[i];
   
  // }

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
router.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;

 
    const movies = await Movie.find({ genre: genre }).exec();
    const found = movies.filter(movie => movie.genre === genre);
 

  res.send(found);
});

/// monta el form ///////////////////////////////////////////////////no eliminar


// router.get('/form', async (req, res) =>{

//   res.send(`<html><body>
//   <p>Añadir Pelicula</p>
//   <form action="/add" method="POST" class="form">
//   Ingrese id:
//   <input class ="imput" id="id" type="number" name="id" size="10"><br>
//   Ingrese nombre:
//   <input id="name" type="text" name="name" size="10"><br>
//   Ingrese genero:
//   <input id="genre" type="text" name="genre" size="10"><br>
//   <input type="submit" value="Sent">
// </form>
// </body></html>`)
// });

router.post('/add',(req, res) =>{


  let movie = new Movie();
  movie.id = req.body.id;
  movie.name = req.body.name;
  movie.genre = req.body.genre;

  console.log(movie);
  movie.save((err) =>{

          if (err) res.status(500).send(
            {message:`Error al guardar el reistro ${movie.name} `})
    
          res.status(200).send(`Añadido correctamente ${movie.name}`);
    
        })


});

// router.post('/add/movies', (req, res) =>{

//    let movie = new Movie();
//      movie.id = req.body.id;
//      movie.name = req.body.name;     
//      movie.genre = req.body.genre;
//     //  movie.id = 13;
//     //  movie.name = "La bala que doblo la esquina";     
//     //  movie.genre = "comedy";

//     movie.save((err, movieStored) =>{

//       if (err) res.status(500).send({message:`Error al guardar el reistro ${movie.name} `})

//       res.status(200).send({movie: movieStored});

//     })
//   });


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

router.use(express.static('app'));//es la  que abre el html 

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});