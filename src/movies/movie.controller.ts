import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // Create a new movie
  @Post()
  async addMovie(@Body() createMovieDto: CreateMovieDto) {
    const generatedId = await this.movieService.insertMovie(createMovieDto);
    return { id: generatedId };
  }

  // Get a list of all movies paginated
  @Get()
  async getAllMovies(
    @Query('page') page: number = 1, // Default to page 1
    @Query('limit') limit: string = '10', // Default to 10 items per page
  ) {
    return this.movieService.getMoviesPaginated(page, limit);
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
