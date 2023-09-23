import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreSchema } from './genre.model';
import { MovieSchema } from '../movies/movie.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
