import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchDTO } from './creat.DTO';
import { IsString, Length, IsInt } from 'class-validator';
import { watchDTO } from './watch.DTO';

export class UpdateWatchDTO {
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsString()
  image?: string;

  @IsString()
  @Length(2, 225)
  describe?: string;

  @IsInt()
  price?: number;
}
