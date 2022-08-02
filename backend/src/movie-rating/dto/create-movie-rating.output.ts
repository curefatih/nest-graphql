import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateMovieRatingOutput {
  @Field(() => String)
  _id: string;

  @Field()
  rating: number;

  @Field()
  comment: string;

  @Field()
  movieId: string;
}
