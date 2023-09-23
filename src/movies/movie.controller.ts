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
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // Create a new movie
  @Post()
  async addMovie(@Body() createMovieDto: CreateMovieDto) {
    const generatedId = await this.movieService.insertMovie(createMovieDto);
    return { id: generatedId };
  }

  // Get a list of all movies
  @Get()
  async getAllMovies() {
    return await this.movieService.getMovies();
  }

  // Get a movie by title, or genre
  @Get(':id')
  getMovie(@Param('id') query: string) {
    return this.movieService.getMovieByTitleOrGenre(query);
  }

  // Update a movie by ID
  @Patch(':id')
  async updateMovie(
    @Param('id') movieId: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    await this.movieService.updateMovie(movieId, updateMovieDto);
    return null;
  }

  // Delete a movie by ID
  @Delete(':id')
  async removeMovie(@Param('id') movieId: string) {
    await this.movieService.deleteMovie(movieId);
    return null;
  }
}
