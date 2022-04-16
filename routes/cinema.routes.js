import express from 'express';

import { Cinema } from '../models/Cinema.js';

const router = express.Router();

//listado de cines
router.get('/', async (req, res) => {
    //console.log(req)
    const { name } = req.query;
    let cinema = [];
    if (name) {
      cinema = await Cinema.find({ name: name }).exec();
      
  
    } else {
        cinema = await Cinema.find();
    }
    res.send(cinema);
  });


  //listado por nombre
  router.get('/:name', async (req, res) => {
    const { name } = req.params;
    
   
      const cinemas = await Cinema.find({ name: name }).exec();
      // const found = movies.find(movie => movie.title === title);
   
      
    res.send(cinemas);
  });

 //Ciudad Cine
  router.get('/location/:location', async (req, res) => {
    const { location } = req.params;
    console.log(location);
   
      const cinemas = await Cinema.find({ location: location }).exec();
      // const found = movies.find(movie => movie.title === title);
   
      
    res.send(cinemas);
  });

  router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const cinemaModified = new Cinema(req.body);
        cinemaModified._id = id;
        await Cinema.findByIdAndUpdate(id , cinemaModified);
        return res.status(200).json(cinemaModified);
    } catch (error) {
        return next(error);
    }
  });
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      await Cinema.findByIdAndDelete(id);
      return res.status(200).json('Cinema Deleted!');
    } catch (error) {
        return next(error);
    }
  });

  router.post('/add', async (req, res, next) => {
    try {
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.loot,
            //  movies: []
        });
        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    } catch (error) {
        next(error);
    }
});

router.put('/edit-movie', async (req, res, next) => {
    try {
        const { _id } = req.body;
        const { name } = req.body;
        const updatedCinema = await Cinema.findByIdAndUpdate(
          _id,
            { $push: { movie: name } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (error) {
        return next(error);
    }
});

  export { router as cinemaRoutes }