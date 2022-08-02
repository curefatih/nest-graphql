import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IsObjectId } from 'src/common/decorator/is-object-id.decorator';

@InputType()
export class UpdateMovieInput {
  @Field()
  @IsObjectId()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  releaseDate: Date;
}
