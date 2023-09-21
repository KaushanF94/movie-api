import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async addMovie(
    @Body('title') movieTitle: string,
    @Body('description') movieDesc: string,
    @Body('releaseDate') movieReleaseDate: Date,
    @Body('genre') movieGenre: Array<string>,
  ) {
    const generatedId = await this.movieService.insertMovie(
      movieTitle,
      movieDesc,
      movieReleaseDate,
      movieGenre,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllMovies() {
    const movies = await this.movieService.getMovies();
    return movies;
  }

  @Get(':id')
  getMovie(@Param('id') movieId: string) {
    return this.movieService.getSingleMovie(movieId);
  }

  @Patch(':id')
  async updateMovie(
    @Param('id') movieId: string,
    @Body('title') movieTitle: string,
    @Body('description') movieDesc: string,
    @Body('releaseDate') movieReleaseDate: Date,
    @Body('genre') movieGenre: Array<string>,
  ) {
    await this.movieService.updateMovie(
      movieId,
      movieTitle,
      movieDesc,
      movieReleaseDate,
      movieGenre,
    );
    return null;
  }

  @Delete(':id')
  async removeMoviet(@Param('id') movieId: string) {
    await this.movieService.deleteMovie(movieId);
    return null;
  }
}
