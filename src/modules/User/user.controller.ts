import {
  HttpStatus,
  HttpException,
  Controller,
  Get,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './DTO/creat.DTO';
import { ApiSecurity } from '@nestjs/swagger';
import { LoginUserDTO } from './DTO/login.DTO';

@ApiSecurity('basic')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Res() res, @Body() user: CreateUserDTO) {
    const newUser = await this.userService.createUser(user);
    if (!newUser) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res
      .status(HttpStatus.CREATED)
      .json({ status: 'Succeed', message: 'Create Succeed' });
  }

  @Post('login')
  async loginUser(@Res() res, @Body() user: LoginUserDTO) {
    const token: string = await this.userService.loginUser(user);
    if (!token) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return res
      .status(HttpStatus.OK)
      .cookie('token', token)
      .json({ token, message: 'Login Succeed' });
  }

  @Post('logout')
  async logoutUser(@Res() res) {
    return res
      .clearCookie('token')
      .status(HttpStatus.OK)
      .send({ message: 'Clear Cookie Succeed' });
  }
}
