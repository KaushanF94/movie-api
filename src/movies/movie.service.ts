import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
  ) {}

  async insertMovie(
    title: string,
    desc: string,
    releaseDate: Date,
    genres: Array<string>,
  ) {
    const newMovie = new this.movieModel({
      title,
      description: desc,
      releaseDate,
      genres,
    });
    const result = await newMovie.save();
    return result.id as string;
  }

  async getMovies() {
    const movies = await this.movieModel.find().exec();
    return movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
    }));
  }

  async getSingleMovie(title: string) {
    const movie = await this.findMovie(title);
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
    };
  }

  async updateMovie(
    movieId: string,
    title: string,
    desc: string,
    releaseDate: Date,
    genres: Array<string>,
  ) {
    const updatedMovie = await this.findMovie(movieId);
    if (title) {
      updatedMovie.title = title;
    }
    if (desc) {
      updatedMovie.description = desc;
    }
    if (releaseDate) {
      updatedMovie.releaseDate = releaseDate;
    }
    if (genres) {
      updatedMovie.genres = genres;
    }
    updatedMovie.save();
  }

  async deleteMovie(movieId: string) {
    const result = await this.movieModel.deleteOne({ _id: movieId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find movie.');
    }
  }

  private async findMovie(title: string): Promise<Movie> {
    let movie: Movie;
    try {
      movie = await this.movieModel.findById(title).exec();
    } catch (error) {
      throw new NotFoundException('Could not find movie.');
    }
    if (!movie) {
      throw new NotFoundException('Could not find movie.');
    }
    return movie;
  }
}
