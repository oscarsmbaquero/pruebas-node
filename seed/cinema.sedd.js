// Archivo character.seed.js

import mongoose from 'mongoose';

// Imporatmos el modelo Pet en este nuevo archivo.
import { Cinema } from '../models/Cinema.js';

const cinema = [
    {
        name: 'Multicines Alkazar',
        location: 'Plasencia'
      },
      {
        name: 'Cinesa Zubiarte',
        location: 'Bilbao'
      },{
        name: 'Cine Capitol',
        location: 'Madrid'
      },{
        name: 'Cine Callao',
        location: 'Madrid'
      },{
        name: 'Kinepolis',
        location: 'Madrid'
      },{
        name: 'Cine Coliseum',
        location: 'Plasencia'
      },
      {
        name: 'Cine Prueba',
        location: 'Prueba'
      },
];

const cinemaDocuments = cinema.map(cinema => new Cinema(cinema));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allCinemas = await Cinema.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allCinemas.length) {
      await Cinema.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Cinema.insertMany(cinemaDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());