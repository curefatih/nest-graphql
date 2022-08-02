import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMovieDto {
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
