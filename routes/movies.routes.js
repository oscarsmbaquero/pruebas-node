import express from 'express';

import { Movie } from '../models/Movie.js';

const router = express.Router();


router.get('/', async (req, res) => {
    //console.log(req)
    const { genre } = req.query;
    console.log(genre);
    let movies = [];
    if (genre) {
      movies = await Movie.find({ genre: genre }).exec();
      
  
    } else {
      movies = await Movie.find();
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
  router.get('/:title', async (req, res) => {
    const { title } = req.params;
  
   
      const movies = await Movie.find({ title: title }).exec();
      // const found = movies.find(movie => movie.title === title);
   
      
    res.send(movies);
  });
  //listado por genero
  router.get('/:genre', async (req, res) => {
    const { genre } = req.params;
     console.log(genre);

      const movies = await Movie.find({ genre: genre }).exec();
       const found = movies.filter(movie => movie.genre === genre);
   
  
    res.send(found);
  });
  
  //listado por fecha de estreno
  router.get('/year/:year', async (req, res) => {
    
    const { year } = req.params;
  
    try {
          const resul = await Movie.find({ year: { $gt:year } });
      console.log(resul);
          return res.status(200).json(resul);
      } catch (err) {
          return res.status(500).json(err);
      }
  
   
  });

  // router.post('/', async (req, res, next) => {
  //   try {
      
  //     const newMovie = new Movie({
  //       title: req.body.title,
  //       director: req.body.director,
  //       year: req.body.year,
  //       genre: req.body.genre
  //     });
  
      
  //     const createdMovie = await newMovie.save();
  //     return res.status(201).json(createdMovie);
  //   } catch (error) {
  //     next(error);
  //   }
  // });
router.post('/',(req, res) =>{
  //console.log(req.body.title);
let movie = new Movie();
title = req.body.title;
director = req.body.director;
year = req.body.year;
genre = req.body.genre;
console.log(movie);
movie.save((err) =>{

        if (err) res.status(500).send(
          {message:`Error al guardar el reistro ${movie.title} `})
  
        res.status(200).send(`Añadido correctamente ${movie.title}`);
  
      })
 });

  
  
  
  /// monta el form ///////////////////////////////////////////////////no eliminar
  
  
  router.get('/form/form', async (req, res) =>{
   console.log('Entro');
    res.send(`<html><body>
    <form class ="form" action="/movies/add" method="POST" class="form">
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
  
  // router.post('/',(req, res) =>{
  //     //console.log(req.body.title);
  //   let movie = new Movie();
  //   movie.title = req.body.title;
  //   movie.director = req.body.director;
  //   movie.year = req.body.year;
  //   movie.genre = req.body.genre;
  //   console.log(movie);
  //   movie.save((err) =>{
  
  //           if (err) res.status(500).send(
  //             {message:`Error al guardar el reistro ${movie.title} `})
      
  //           res.status(200).send(`Añadido correctamente ${movie.title}`);
      
  //         })
  //    });
  
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
    
    router.delete('/id/:id', async (req, res, next) => {
      try {
        const { id } = req.params;
        console.log(id);
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Movie Deleted!');
      } catch (error) {
          return next(error);
      }
    });
    // router.post('/add',(req, res) =>{
    //   console.log('Entro');
    //     //console.log(req.body.title);
    //   let movie = new Movie();
    //   movie.title = req.body.title;
    //   movie.director = req.body.director;
    //   movie.year = req.body.year;
    //   movie.genre = req.body.genre;
    //   console.log(movie);
    //   movie.save((err) =>{
      
    //           if (err) res.status(500).send(
    //             {message:`Error al guardar el reistro ${movie.title} `})
        
    //           res.status(200).send(`Añadido correctamente ${movie.title}`);
        
    //         })
    //    });
      











export { router as moviesRoutes }