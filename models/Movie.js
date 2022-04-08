import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String, required: true },
    genre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export { Movie }