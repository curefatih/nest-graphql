import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Movie, MovieDocument } from '../../movie/schema/movie.schema';
import { UserDocument } from '../../user/schema/user.schema';

export type MovieRatingDocument = MovieRating & Document;

@Schema()
@ObjectType()
export class MovieRating {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId | string;

  @Prop({ required: true, type: Number })
  @Field()
  rating: number;

  @Prop({ required: true, type: String })
  @Field()
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  owner: mongoose.Schema.Types.ObjectId | string | UserDocument;

  @Field(() => Movie)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  })
  movie: mongoose.Schema.Types.ObjectId | string | MovieDocument;
}

export const MovieRatingSchema = SchemaFactory.createForClass(MovieRating);
