import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './creat.DTO';

export class updateUserDTO extends PartialType(CreateUserDTO) {
  updatedAt: Date;
}
