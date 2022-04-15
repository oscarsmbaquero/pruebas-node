import mongoose from 'mongoose';
//prueba
const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
  {
    
    name: { type: String, required: true },
    location: { type: String, required: true },
    //ref al modelo Movies
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movies' }],
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model('Cinema', cinemaSchema);

export { Cinema }