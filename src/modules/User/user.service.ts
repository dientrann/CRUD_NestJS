import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schems';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './DTO/creat.DTO';
import { LoginUserDTO } from './DTO/login.DTO';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly JwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDTO): Promise<User> {
    const check = await this.UserModel.findOne({ username: user.username });
    if (check)
      throw new HttpException(
        'The user already exists in the database',
        HttpStatus.CONFLICT,
      );
    const numberSalt = this.configService.get<number>('app.GENSALT');
    console.log(numberSalt);

    const salt = await bcrypt.genSalt(numberSalt);
    const password = await bcrypt.hash(user.password, salt);
    const newUser = new this.UserModel({
      username: user.username,
      password: password,
      name: user.name,
      email: user.email,
    });
    return newUser.save();
  }

  async checkUser(user: User): Promise<boolean> {
    const findUser = await this.UserModel.findOne({ username: user.username });
    if (!findUser)
      throw new HttpException(
        'User not found in the database',
        HttpStatus.NOT_FOUND,
      );
    const checkPassword = await bcrypt.compare(
      user.password,
      findUser.password,
    );
    if (!checkPassword) return false;
    return true;
  }

  async loginUser(user: LoginUserDTO): Promise<string> {
    const findUser = await this.UserModel.findOne({ username: user.username });
    if (!findUser)
      throw new HttpException(
        'User not found in the database',
        HttpStatus.NOT_FOUND,
      );
    const checkPassword = await bcrypt.compare(
      user.password,
      findUser.password,
    );
    if (!checkPassword)
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    const token = await this.JwtService.sign({
      username: findUser.username,
      password: user.password,
    });
    return token;
  }
}
