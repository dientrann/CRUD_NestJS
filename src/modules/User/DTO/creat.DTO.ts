import { UserDTO } from './user.DTO';
import { IsString, Length, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO extends UserDTO {
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

  @ApiProperty({ example: 'Name', description: 'Name of the user' })
  @IsString()
  @Length(2, 10)
  name: string;

  @ApiProperty({
    example: 'name@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
