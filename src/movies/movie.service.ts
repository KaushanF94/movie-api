import { Injectable, NotFoundException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './movie.model';
import { Genre } from '../genres/genre.model';
import { GenreService } from '../genres/genre.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  private genreService: GenreService;
  constructor(
    @InjectModel('Movie') private readonly movieModel: Model<Movie>,
    @InjectModel('Genre') private genreModel: Model<Genre>,
    private moduleRef: ModuleRef,
  ) {
    // Initialize the genreService using the ModuleRef
    this.genreService = this.moduleRef.get(GenreService, { strict: false });
  }

  // Create a new movie, adding non-existing genres if necessary
  async insertMovie(createMovieDto: CreateMovieDto) {
    this.genreService = new GenreService(
      this.genreModel,
      this.movieModel,
      this.moduleRef,
    );

    // Get existing genres from the genre service
    const existingGenres = await this.genreService.getGenres();

    // Find genres that don't exist in the database
    const nonExistingGenres = createMovieDto.genres.filter(genre => {
      return !existingGenres.some(
        existingGenre => existingGenre.name === genre,
      );
    });

    if (nonExistingGenres.length > 0) {
      // Add non-existing genres to the Genre collection
      for (const genreName of nonExistingGenres) {
        await this.genreService.insertGenre({ name: genreName });
      }
    }

    // Create and save the new movie
    const newMovie = new this.movieModel(createMovieDto);
    const result = await newMovie.save();
    return result.id as string;
  }

  // Get a list of all movies
  async getMovies() {
    return await this.movieModel.find().exec();
  }

  // Get movies by title or genre
  async getMovieByTitleOrGenre(query: string): Promise<Movie[]> {
    try {
      let movies: Movie[];
      movies = await this.movieModel
        .find({
          $or: [
            { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
            { genres: { $in: [query] } }, // Genre search
          ],
        })
        .exec();

      if (!movies || movies.length === 0) {
        throw new NotFoundException(
          'No movies found with the provided title or genre.',
        );
      }

      return movies;
    } catch (error) {
      throw new NotFoundException('Could not find movie.');
    }
  }

  // Update a movie by ID
  async updateMovie(movieId: string, updateMovieDto: UpdateMovieDto) {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(
      movieId,
      updateMovieDto,
      { new: true },
    );
    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return updatedMovie;
  }

  // Delete a movie by ID
  async deleteMovie(movieId: string) {
    const deletedMovie = await this.movieModel.findByIdAndRemove(movieId);
    if (!deletedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return deletedMovie;
  }
}
