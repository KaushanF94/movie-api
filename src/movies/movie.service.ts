import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Movie } from './movie.model';
import { Genre } from '../genres/genre.model';
import { GenreService } from '../genres/genre.service';
@Injectable()
export class MovieService {
  private genreService: GenreService;
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @InjectModel('Genre') private genreModel: Model<Genre>,
    private moduleRef: ModuleRef,
  ) {
    this.genreService = this.moduleRef.get(GenreService, { strict: false });
  }

  async insertMovie(
    title: string,
    desc: string,
    releaseDate: string,
    genres: string[],
  ) {
    this.genreService = new GenreService(this.genreModel);
    const existingGenres = await this.genreService.getGenres();

    const nonExistingGenres = genres.filter(genre => {
      return !existingGenres.some(
        existingGenre => existingGenre.name === genre,
      );
    });

    if (nonExistingGenres.length > 0) {
      // Add non-existing genres to the Genre collection
      for (const genreName of nonExistingGenres) {
        await this.genreService.insertGenre(genreName);
      }
    }

    const newMovie = new this.movieModel({
      title,
      description: desc,
      releaseDate: new Date(releaseDate),
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
    genres: string[],
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
