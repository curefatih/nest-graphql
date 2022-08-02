import { Field, InputType } from '@nestjs/graphql';
import { IsObjectId } from '../decorator/is-object-id.decorator';

@InputType()
export class ID {
  @Field()
  @IsObjectId()
  _id: string;
}
