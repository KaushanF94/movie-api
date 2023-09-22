import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async addGenre(@Body('name') genreName: string) {
    const generatedId = await this.genreService.insertGenre(genreName);
    return { id: generatedId };
  }

  @Get()
  async getAllGenres() {
    const genres = await this.genreService.getGenres();
    return genres;
  }

  @Delete(':id')
  async removeGenre(@Param('id') genreId: string) {
    await this.genreService.deleteGenre(genreId);
    return null;
  }
}
