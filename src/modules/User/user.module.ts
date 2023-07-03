import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schems';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../config/configuration';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot({ load: [config], envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.KEY_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class UserModule {}
