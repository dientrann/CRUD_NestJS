import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe, } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('app.SERVER_PORT.PORT');
  const HOST = configService.get<string>('app.SERVER_PORT.HOST');

  await app.listen(PORT, ()=>{
    console.log('Server is started on '+ HOST + ': ' + PORT);
  });
}
bootstrap();
