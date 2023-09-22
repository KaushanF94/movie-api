import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genre.model';

@Injectable()
export class GenreService {
  constructor(@InjectModel('Genre') private genreModel: Model<Genre>) {}

  async insertGenre(name: string) {
    const newGenre = new this.genreModel({
      name,
    });
    const result = await newGenre.save();
    return result.id as string;
  }

  async getGenres() {
    const genres = await this.genreModel.find().exec();
    return genres.map(genre => ({
      id: genre.id,
      name: genre.name,
    }));
  }

  async deleteGenre(genreId: string) {
    const result = await this.genreModel.deleteOne({ _id: genreId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find genre.');
    }
  }
}
