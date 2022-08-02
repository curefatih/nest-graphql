import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateMovieOutput {
  @Field(() => String)
  _id: string;

  @Field()
  name: string;

  @Field()
  releaseDate: Date;
}
