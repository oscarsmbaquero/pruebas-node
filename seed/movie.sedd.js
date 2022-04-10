// Archivo character.seed.js

import mongoose from 'mongoose';

// Imporatmos el modelo Pet en este nuevo archivo.
import { Movie } from '../models/Movie.js';

const movie = [
    {
    
        "id": 1,
        "name": "La histotria interminable",
        "genre": "fantasy"
      },
      {
        
        "id": 2,
        "name": "Dias de Futbol",
        "genre": "comedy"
      },
      {
        
        "id": 4,
        "name": "En el nombre del padre",
        "genre": "drama"
      },
      {
        
        "id": 5,
        "name": "El expresso de media noche",
        "genre": "drama"
      },
      {
        
        "id": 3,
        "name": "Airbag",
        "genre": "comedy"
      },
      {
        
        "id": 98,
        "name": "Blow",
        "genre": "drama"
        
      },
      
      {
        
        "id": 1024,
        "name": "Primos",
        "genre": "comedy"
        
      },
      {
        
        "id": 1025,
        "name": "Primossss",
        "genre": "comedy"
        
      }, 
];

const movieDocuments = movie.map(movie => new Movie(movie));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allMovies = await Movie.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allMovies.length) {
      await Movie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Movie.insertMany(movieDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());