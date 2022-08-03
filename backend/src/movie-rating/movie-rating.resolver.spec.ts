import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CurrentUserPayload } from 'src/common/decorator/current-user.decorator';
import { CreateMovieRatingInput } from './dto/create-movie-rating.input';
import { UpdateMovieRatingOutput } from './dto/update-movie-rating.output';
import { MovieRatingResolver } from './movie-rating.resolver';
import { MovieRatingService } from './movie-rating.service';

const movieRatingId = new mongoose.Types.ObjectId();

const createMovieRatingInput: CreateMovieRatingInput = {
  comment: 'test',
  rating: 5,
  movieId: new mongoose.Types.ObjectId().toString(),
};

const updateMovieRatingInput: UpdateMovieRatingOutput = {
  _id: movieRatingId.toString(),
  comment: 'test',
  rating: 5,
  movieId: new mongoose.Types.ObjectId().toString(),
};

const currentUser: CurrentUserPayload = {
  userId: new mongoose.Types.ObjectId().toString(),
  payload: {},
};

describe('MovieRatingResolver', () => {
  let resolver: MovieRatingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieRatingResolver,
        {
          provide: MovieRatingService,
          useValue: {
            create: jest.fn(() =>
              Promise.resolve({
                _id: movieRatingId,
                ...createMovieRatingInput,
              }),
            ),
            update: jest.fn(() =>
              Promise.resolve({
                _id: movieRatingId,
                ...updateMovieRatingInput,
              }),
            ),
            delete: jest.fn(() =>
              Promise.resolve({
                _id: movieRatingId,
                ...updateMovieRatingInput,
              }),
            ),
            findByOwnerId: jest.fn(() =>
              Promise.resolve([
                {
                  _id: movieRatingId,
                  ...createMovieRatingInput,
                },
              ]),
            ),
          },
        },
      ],
    }).compile();

    resolver = module.get<MovieRatingResolver>(MovieRatingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create rating', async () => {
    const movieRating = await resolver.createMovieRating(
      currentUser,
      createMovieRatingInput,
    );

    expect(movieRating._id.toString()).toBe(movieRatingId.toString());
    expect(movieRating.comment).toBe(createMovieRatingInput.comment);
    expect(movieRating.rating).toBe(createMovieRatingInput.rating);
    expect((movieRating as any).movieId).toBe(createMovieRatingInput.movieId);
  });

  it('should update rating', async () => {
    const movieRating = await resolver.updateMovieRating(
      currentUser,
      updateMovieRatingInput,
    );

    expect(movieRating._id.toString()).toBe(movieRatingId.toString());
    expect(movieRating.comment).toBe(updateMovieRatingInput.comment);
    expect(movieRating.rating).toBe(updateMovieRatingInput.rating);
    expect((movieRating as any).movieId).toBe(updateMovieRatingInput.movieId);
  });

  it('should delete rating', async () => {
    const movieRating = await resolver.deleteMovieRating(
      currentUser,
      updateMovieRatingInput,
    );

    expect(movieRating._id.toString()).toBe(movieRatingId.toString());
    expect(movieRating.comment).toBe(updateMovieRatingInput.comment);
    expect(movieRating.rating).toBe(updateMovieRatingInput.rating);
    expect((movieRating as any).movieId).toBe(updateMovieRatingInput.movieId);
  });

  it('should give current users ratings', async () => {
    const movieRatings = await resolver.movieRatings(currentUser);

    expect(movieRatings[0]._id.toString()).toBe(movieRatingId.toString());
    expect(movieRatings[0].comment).toBe(createMovieRatingInput.comment);
    expect(movieRatings[0].rating).toBe(createMovieRatingInput.rating);
    expect((movieRatings[0] as any).movieId).toBe(
      createMovieRatingInput.movieId,
    );
  });
});
