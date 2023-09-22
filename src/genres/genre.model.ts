import * as mongoose from 'mongoose';

export const GenreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: 'genres' },
);

export interface Genre extends mongoose.Document {
  name: string;
}
