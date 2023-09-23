import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movie.module';
import { GenreModule } from './genres/genre.module';
import { RequestLoggingMiddleware } from './middleware/request-logging.middleware';
import 'dotenv/config';
@Module({
  imports: [
    MoviesModule,
    GenreModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply the request logging middleware to all routes
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
