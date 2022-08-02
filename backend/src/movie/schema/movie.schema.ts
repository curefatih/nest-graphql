import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MovieRating } from 'src/movie-rating/schema/movie-rating.schema';
import { UserDocument } from 'src/user/schema/user.schema';

export type MovieDocument = Movie & Document;

@Schema()
@ObjectType()
export class Movie {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  releaseDate: Date;

  @Field(() => [MovieRating])
  movieRatings: MovieRating[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Schema.Types.ObjectId | string | UserDocument;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
