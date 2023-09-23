import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

import { GenreService } from './genre.service';
import { CreateGenreDto } from './genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // Create a new genre
  @Post()
  async addGenre(@Body() createGenreDto: CreateGenreDto) {
    const generatedId = await this.genreService.insertGenre(createGenreDto);
    return { id: generatedId };
  }

  // Get a list of all genres
  @Get()
  async getAllGenres() {
    const genres = await this.genreService.getGenres();
    return genres;
  }

  // Delete a genre by ID
  @Delete(':id')
  async removeGenre(@Param('id') genreId: string) {
    await this.genreService.deleteGenre(genreId);
    return null;
  }
}
