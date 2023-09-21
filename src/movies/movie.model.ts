import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genres: { type: Array<String>, required: true },
});

export interface Movie extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genres:Array<string>
}
