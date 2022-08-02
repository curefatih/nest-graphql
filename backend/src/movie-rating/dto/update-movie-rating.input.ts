import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { IsObjectId } from 'src/common/decorator/is-object-id.decorator';

@InputType()
export class UpdateMovieRatingInput {
  @Field()
  @IsObjectId()
  @IsNotEmpty()
  _id: string;

  @Field()
  @Max(10)
  @Min(0)
  rating: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  comment: string;
}
