import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from '../../common/decorator/is-object-id.decorator';

@InputType()
export class DeleteMovieRatingInput {
  @Field()
  @IsObjectId()
  @IsNotEmpty()
  _id: string;
}
