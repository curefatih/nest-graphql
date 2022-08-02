import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie, MovieDocument } from './schema/movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async createMovie(ownerId: string, movieDto: CreateMovieDto): Promise<Movie> {
    const ownerObjectId = new mongoose.Types.ObjectId(ownerId);

    const movie = new this.movieModel({
      ...movieDto,
      owner: ownerObjectId,
    });

    return movie.save();
  }

  async updateMovie(
    ownerId: string,
    movieDto: UpdateMovieInput,
  ): Promise<Movie> {
    const movie = await this.movieModel
      .findOne({
        _id: movieDto._id,
        owner: new mongoose.Types.ObjectId(ownerId),
      })
      .exec();

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie.name = movieDto.name;
    movie.releaseDate = movieDto.releaseDate;

    return movie.save();
  }

  async find(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOneById(ownerId: string, id: string): Promise<Movie> {
    return this.movieModel
      .findOne({
        _id: id,
        owner: new mongoose.Types.ObjectId(ownerId),
      })
      .exec();
  }

  async findAllByOwnerId(ownerId: string): Promise<Movie[]> {
    return this.movieModel
      .find({
        owner: new mongoose.Types.ObjectId(ownerId),
      })
      .exec();
  }

  async findByUserIdAndId(userId: string, movieId: string): Promise<Movie> {
    const movie = await this.movieModel
      .findOne({
        _id: movieId,
        owner: new mongoose.Types.ObjectId(userId),
      })
      .exec();

    return movie;
  }
}
