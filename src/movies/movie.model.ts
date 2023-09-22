import * as mongoose from 'mongoose';
import { Genre } from '../genres/genre.model';

export const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genres: { type: [], required: true, ref: 'Genre' },
  },
  { collection: 'movies' },
);

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genres: string[];
}
