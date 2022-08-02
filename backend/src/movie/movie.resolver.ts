import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CurrentUser,
  CurrentUserPayload,
} from 'src/common/decorator/current-user.decorator';
import { ID } from 'src/common/gq-types/id.input';
import { MovieRatingService } from 'src/movie-rating/movie-rating.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieInput } from './dto/update-movie.input';
import { UpdateMovieOutput } from './dto/update-movie.output';
import { MovieService } from './movie.service';
import { Movie } from './schema/movie.schema';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(
    private readonly movieService: MovieService,
    private readonly movieRatingService: MovieRatingService,
  ) {}

  @Mutation(() => Movie)
  async createMovie(
    @CurrentUser() user: CurrentUserPayload,
    @Args('input') input: CreateMovieDto,
  ): Promise<Movie> {
    return this.movieService.createMovie(user.userId, input);
  }

  @Mutation(() => UpdateMovieOutput)
  async updateMovie(
    @CurrentUser() user: CurrentUserPayload,
    @Args('input') input: UpdateMovieInput,
  ): Promise<Movie> {
    return this.movieService.updateMovie(user.userId, input);
  }

  @Query(() => [Movie])
  async movies(@CurrentUser() user: CurrentUserPayload) {
    return this.movieService.findAllByOwnerId(user.userId);
  }

  @Query(() => Movie)
  async movie(@CurrentUser() user: CurrentUserPayload, @Args('id') id: ID) {
    return this.movieService.findOneById(user.userId, id._id);
  }

  @ResolveField()
  async movieRatings(@Parent() movie: Movie) {
    const { _id } = movie;
    return this.movieRatingService.findAllByMovieId(_id as string);
  }
}
