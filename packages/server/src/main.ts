/*
 * @Author: wangxian
 * @Date: 2022-08-16 19:00:58
 * @LastEditTime: 2022-08-18 13:51:06
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 全局路由前缀
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port, () =>
    console.log(`[API] 服务已经启动 ${config.get<string>('BASE_URL')}`),
  );
}

bootstrap();
