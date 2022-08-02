import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingResolver } from './movie-rating.resolver';

describe('MovieRatingResolver', () => {
  let resolver: MovieRatingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRatingResolver],
    }).compile();

    resolver = module.get<MovieRatingResolver>(MovieRatingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
