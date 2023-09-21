import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieSchema } from './movie.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movies', schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
