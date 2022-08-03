import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CurrentUserPayload } from '../common/decorator/current-user.decorator';
import { MovieRatingService } from '../movie-rating/movie-rating.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';
import { Movie } from './schema/movie.schema';

const movieId = new mongoose.Types.ObjectId();

const createMovieInput: CreateMovieInput = {
  name: 'test',
  releaseDate: new Date(),
};

const updateMovieInput: UpdateMovieInput = {
  _id: movieId.toString(),
  name: 'test',
  releaseDate: new Date(),
};

const movieRating: any = {
  _id: new mongoose.Types.ObjectId(),
  rating: 5,
  comment: 'test',
};

const currentUser: CurrentUserPayload = {
  userId: new mongoose.Types.ObjectId().toString(),
  payload: {},
};

describe('MovieResolver', () => {
  let resolver: MovieResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieResolver,
        {
          provide: MovieService,
          useValue: {
            createMovie: jest.fn(() =>
              Promise.resolve({
                _id: movieId,
                ...createMovieInput,
              }),
            ),
            updateMovie: jest.fn(() =>
              Promise.resolve({
                _id: movieId,
                ...updateMovieInput,
              }),
            ),
            findAllByOwnerId: jest.fn(() =>
              Promise.resolve([
                {
                  _id: movieId,
                  ...createMovieInput,
                },
              ]),
            ),
            findOneById: jest.fn(() =>
              Promise.resolve({
                _id: movieId,
                ...createMovieInput,
              }),
            ),
          },
        },
        {
          provide: MovieRatingService,
          useValue: {
            findAllByMovieId: jest.fn(() => Promise.resolve([movieRating])),
          },
        },
      ],
    }).compile();

    resolver = module.get<MovieResolver>(MovieResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create movie', async () => {
    const movie = await resolver.createMovie(currentUser, createMovieInput);

    expect(movie._id).toEqual(movieId);
    expect(movie.name).toEqual(createMovieInput.name);
    expect(movie.releaseDate).toEqual(createMovieInput.releaseDate);
  });

  it('should update movie', async () => {
    const movie = await resolver.updateMovie(currentUser, updateMovieInput);
    expect(movie._id.toString()).toEqual(movieId.toString());
    expect(movie.name).toEqual(updateMovieInput.name);
    expect(movie.releaseDate).toEqual(updateMovieInput.releaseDate);
  });

  it('should find all by owner id', async () => {
    const movies = await resolver.movies(currentUser);
    expect(movies.length).toEqual(1);
    expect(movies[0]._id).toEqual(movieId);
    expect(movies[0].name).toEqual(createMovieInput.name);
    expect(movies[0].releaseDate).toEqual(createMovieInput.releaseDate);
  });

  it('should find one by id', async () => {
    const movie = await resolver.movie(currentUser, {
      _id: movieId.toString(),
    });
    expect(movie._id).toEqual(movieId);
    expect(movie.name).toEqual(createMovieInput.name);
    expect(movie.releaseDate).toEqual(createMovieInput.releaseDate);
  });

  it('should find with movie ratings', async () => {
    const movieRatings = await resolver.movieRatings({
      _id: movieId.toString(),
      ...createMovieInput,
    } as Movie);

    expect(movieRatings.length).toEqual(1);
    expect(movieRatings).toEqual(
      expect.arrayContaining([expect.objectContaining(movieRating)]),
    );
  });
});
