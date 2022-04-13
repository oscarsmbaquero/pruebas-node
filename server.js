import express from 'express';
import bodyParser from "body-parser";
import './db.js';

import { Movie } from './models/Movie.js';

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send('Api de peliculas de Oscar!');
});

// Listado
router.get('/movies', async (req, res) => {//req me trae info que queremos pasar a la query
  //console.log(req)
  const { genre } = req.query;// lo meto en la variable genre
  //console.log(genre);
  let movies = [];//creo array vacio donde introducire los datos extraudos de la bd
  if (genre) {
    movies = await Movie.find({ genre: genre }).exec();//busco si encuentro algo 
    

  } else {
    movies = await Movie.find();//los traigo todos
  }
  res.send(movies);
});

// router.get('/movies', async (req, res) => {//req me trae info que queremos pasar a la query
//     //console.log(req)
//     const { genre } = req.query;// lo meto en la variable genre  
//     let movies = [];//creo array vacio donde introducire los datos extraudos de la bd
//     if (genre) {
//       movies = await Movie.find({ genre: genre }).exec();//busco si encuentro algo 
//       debugger
  
//     } else {
//       movies = await Movie.find();//pagina en blanco sino he encontrado nada
//     }
//     movies.forEach(obj => {
//       res.send( ` <div class="flip-container">
//       <div class="card">
//         <h3>${obj.title}</h3>
//           <h3>${obj.director}</h3>
//           <h5>${obj.year}</h5>
//           <h5>${obj.genre}</h5>
//       </div>
//     </div>`)
     
//     });
  
    
//   });
//listado por titulo
router.get('/movies/:title', async (req, res) => {
  const { title } = req.params;

 
    const movies = await Movie.find({ title: title }).exec();
    // const found = movies.find(movie => movie.title === title);
 
    
  res.send(movies);
});
//listado por genero
router.get('/movies/genre/:genre', async (req, res) => {
  const { genre } = req.params;
   console.log(genre);
 
    const movies = await Movie.find({ genre: genre }).exec();
    // const found = movies.filter(movie => movie.genre === genre);
 

  res.send(movies);
});

//listado por fecha de estreno
router.get('/movies/year/:year', async (req, res) => {
  
  const { year } = req.params;

  try {
		const resul = await Movie.find({ year: { $gt:year } });
    console.log(resul);
		return res.status(200).json(resul);
	} catch (err) {
		return res.status(500).json(err);
	}

 
});



/// monta el form ///////////////////////////////////////////////////no eliminar


router.get('/form', async (req, res) =>{

  res.send(`<html><body>
  <form class ="form" action="/add" method="POST" class="form">
        Ingrese Título:
        <input class ="imput" id="title" type="text" name="title" size="10"><br>
        Ingrese Director:
        <input class ="imput" id="director" type="text" name="director" size="10"><br>
        Ingrese Año:
        <input id="year" type="number" name="year" size="10"><br>
        Ingrese genero:
        <input id="genre" type="text" name="genre" size="10"><br>
        <input type="submit" value="Enviar">
  </form>
</body></html>`)
});

router.post('/',(req, res) =>{
  let movie = new Movie();
  movie.title = req.body.title;
  movie.director = req.body.director;
  movie.year = req.body.year;
  movie.genre = req.body.genre;
  console.log(movie);
  movie.save((err) =>{

          if (err) res.status(500).send(
            {message:`Error al guardar el reistro ${movie.title} `})
    
          res.status(200).send(`Añadido correctamente ${movie.title}`);
    
        })
   });

   router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const movieModified = new Movie(req.body);
        movieModified._id = id;
        await Movie.findByIdAndUpdate(id , movieModified);
        return res.status(200).json(movieModified);
    } catch (error) {
        return next(error);
    }
  });
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      await Movie.findByIdAndDelete(id);
      return res.status(200).json('Movie Deleted!');
    } catch (error) {
        return next(error);
    }
  });
  


// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/', router);

//router.use(express.static('app'));//es la  que abre el html 



// Crearemos un middleware para cuando no encontremos la ruta que busquemos
server.use('*', (req, res, next) => {
  const error = new Error('Route not found'); 
  error.status = 404;
  next(error); // Lanzamos la función next() con un error
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});