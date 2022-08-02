import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateMovieRatingOutput {
  @Field(() => String)
  _id: string;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  movieId: string;
}
