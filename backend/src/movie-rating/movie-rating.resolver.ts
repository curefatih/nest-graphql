import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CurrentUser,
  CurrentUserPayload,
} from '../common/decorator/current-user.decorator';
import { CreateMovieRatingInput } from './dto/create-movie-rating.input';
import { DeleteMovieRatingInput } from './dto/delete-movie-rating.input';
import { DeleteMovieRatingOutput } from './dto/delete-movie-rating.output';
import { UpdateMovieRatingInput } from './dto/update-movie-rating.input';
import { UpdateMovieRatingOutput } from './dto/update-movie-rating.output';
import { MovieRatingService } from './movie-rating.service';
import { MovieRating } from './schema/movie-rating.schema';

@Resolver()
export class MovieRatingResolver {
  constructor(private readonly movieRatingService: MovieRatingService) {}

  @Mutation(() => MovieRating)
  async createMovieRating(
    @CurrentUser() user: CurrentUserPayload,
    @Args('input') input: CreateMovieRatingInput,
  ): Promise<MovieRating> {
    return this.movieRatingService.create(user.userId, input);
  }

  @Mutation(() => UpdateMovieRatingOutput)
  async updateMovieRating(
    @CurrentUser() user: CurrentUserPayload,
    @Args('input') input: UpdateMovieRatingInput,
  ): Promise<MovieRating> {
    return this.movieRatingService.update(user.userId, input);
  }

  @Mutation(() => DeleteMovieRatingOutput)
  async deleteMovieRating(
    @CurrentUser() user: CurrentUserPayload,
    @Args('input') input: DeleteMovieRatingInput,
  ): Promise<MovieRating> {
    return this.movieRatingService.delete(user.userId, input._id);
  }

  @Query(() => [MovieRating])
  async movieRatings(@CurrentUser() user: CurrentUserPayload) {
    return this.movieRatingService.findByOwnerId(user.userId);
  }
}
