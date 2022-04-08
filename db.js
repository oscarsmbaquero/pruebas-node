import mongoose from 'mongoose';

// URL local de nuestra base de datos en mongoose y su nombre upgrade_class_3
const DB_URL = 'mongodb://localhost:27017/movies';

// Función que conecta nuestro servidor a la base de datos de MongoDB mediante mongoose
const connection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { connection };