import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieSchema } from './movie.model';
import { GenreSchema } from '../genres/genre.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
