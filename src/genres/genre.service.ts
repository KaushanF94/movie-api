import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './genre.model';
import { CreateGenreDto } from '../genres/genre.dto';
import { ModuleRef } from '@nestjs/core';
import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';
@Injectable()
export class GenreService {
  private movieService: MovieService;
  constructor(
    @InjectModel('Genre') private genreModel: Model<Genre>,
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    private moduleRef: ModuleRef,
  ) {
    // Initialize the movieService using the ModuleRef
    this.movieService = this.moduleRef.get(MovieService, { strict: false });
  }

  // Insert a new genre into the database
  async insertGenre(createGenreDto: CreateGenreDto) {
    const newGenre = new this.genreModel(createGenreDto);
    const result = await newGenre.save();
    return result.id as string;
  }

  // Get a list of all genres from the database
  async getGenres() {
    return await this.genreModel.find().exec();
  }

  // Delete a genre and remove it from movies that contain it
  async deleteGenre(genreId: string) {
    // Initialize the movieService with the required dependencies
    this.movieService = new MovieService(
      this.movieModel,
      this.genreModel,
      this.moduleRef,
    );

    const genreToDelete = await this.genreModel.findById(genreId).exec();
    if (!genreToDelete) {
      throw new NotFoundException('Genre not found');
    }
    // Find all movies containing the genre to be deleted
    const moviesWithGenre = await this.movieService.getMovieByTitleOrGenre(
      genreToDelete.name,
    );

    // Remove the genre from each movie
    for (const movie of moviesWithGenre) {
      movie.genres = movie.genres.filter(genre => genre !== genreToDelete.name);
      await movie.save();
    }

    // Delete the genre from the database
    await genreToDelete.remove();
  }
}
