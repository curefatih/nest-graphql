import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { IsObjectId } from '../../common/decorator/is-object-id.decorator';

@InputType()
export class CreateMovieRatingInput {
  @Field()
  @Max(10)
  @Min(0)
  rating: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  comment: string;

  @Field()
  @IsObjectId()
  @IsNotEmpty()
  movieId: string;
}
