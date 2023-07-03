import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { Watch, WatchSchema } from 'src/schemas/watch.schema';
import { checkToken } from 'src/middleware/checktoken.middleware';
import { JwtModule } from '@nestjs/jwt';
import config from '../../config/configuration';

@Module({
  controllers: [WatchController],
  providers: [WatchService, checkToken],
  imports: [
    ConfigModule.forRoot({ load: [config], envFilePath: '.env' }),
    MongooseModule.forFeature([{ name: Watch.name, schema: WatchSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.KEY_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class WatchModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkToken)
      .exclude({ path: 'watchs', method: RequestMethod.GET })
      .forRoutes(WatchController);
  }
}
