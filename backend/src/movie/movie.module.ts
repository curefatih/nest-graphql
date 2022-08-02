import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schema/movie.schema';
import { MovieRatingModule } from 'src/movie-rating/movie-rating.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    MovieRatingModule,
  ],
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
