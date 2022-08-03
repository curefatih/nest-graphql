import { forwardRef, Module } from '@nestjs/common';
import { MovieRatingService } from './movie-rating.service';
import { MovieRatingResolver } from './movie-rating.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieRating, MovieRatingSchema } from './schema/movie-rating.schema';
import { MovieModule } from '../movie/movie.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MovieRating.name,
        schema: MovieRatingSchema,
      },
    ]),
    forwardRef(() => MovieModule),
  ],
  providers: [MovieRatingService, MovieRatingResolver],
  exports: [MovieRatingService],
})
export class MovieRatingModule {}
