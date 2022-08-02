import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MovieService } from 'src/movie/movie.service';
import { CreateMovieRatingInput } from './dto/create-movie-rating.input';
import { UpdateMovieRatingInput } from './dto/update-movie-rating.input';
import { MovieRating, MovieRatingDocument } from './schema/movie-rating.schema';

@Injectable()
export class MovieRatingService {
  constructor(
    @InjectModel(MovieRating.name)
    private movieRatingModel: Model<MovieRatingDocument>,
    private movieService: MovieService,
  ) {}

  async create(
    userId: string,
    input: CreateMovieRatingInput,
  ): Promise<MovieRating> {
    const movie = await this.movieService.findByUserIdAndId(
      userId,
      input.movieId,
    );

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const movieRating = new this.movieRatingModel({
      ...input,
      movie: new mongoose.Types.ObjectId(input.movieId),
      owner: new mongoose.Types.ObjectId(userId),
    });

    return movieRating.save();
  }

  async update(
    userId: string,
    input: UpdateMovieRatingInput,
  ): Promise<MovieRating> {
    const movieRating = await this.findOneByOwnerIdAndId(userId, input._id);
    if (!movieRating) {
      throw new NotFoundException('Movie not found');
    }

    movieRating.rating = input.rating;
    movieRating.comment = input.comment;

    return movieRating.save();
  }

  async delete(userId: string, movieRatingId: string): Promise<MovieRating> {
    const movieRating = await this.findOneByOwnerIdAndId(userId, movieRatingId);
    if (!movieRating) {
      throw new NotFoundException('Movie not found');
    }

    await movieRating.remove();

    movieRating.movieId = movieRating.movie._id;
    return movieRating;
  }

  async findOneByOwnerIdAndId(
    userId: string,
    movieRatingId: string,
  ): Promise<any> {
    const movieRating = await this.movieRatingModel
      .findOne({
        _id: movieRatingId,
        owner: new mongoose.Types.ObjectId(userId),
      })
      .exec();

    return movieRating;
  }

  async findByOwnerId(userId: string): Promise<MovieRating[]> {
    return this.movieRatingModel.find({ userId }).populate('movie').exec();
  }

  async findAllByMovieId(movieId: string): Promise<MovieRating[]> {
    return this.movieRatingModel
      .find({ movieId: new mongoose.Types.ObjectId(movieId) })
      .exec();
  }
}
