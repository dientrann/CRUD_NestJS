import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/configuration';
import { UserModule } from './modules/User/user.module';
import { WatchModule } from './modules/Watch/watch.module';



@Module({
  imports: [ConfigModule.forRoot({ load:[config], envFilePath: '.env' }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) =>({
      uri: configService.get<string>('app.MONGO_URI'),
    }),
    inject: [ConfigService],
  }),
  UserModule,
  WatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{};

