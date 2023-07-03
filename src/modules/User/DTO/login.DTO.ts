import { UserDTO } from './user.DTO';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO extends UserDTO {
  @ApiProperty({
    example: 'username',
    description: 'Full username of the user',
  })
  @IsString()
  @Length(5, 20)
  username: string;

  @ApiProperty({ example: 'pass12345', description: 'Password of the user' })
  @IsString()
  @Length(6, 20)
  password: string;
}
