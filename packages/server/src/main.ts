/*
 * @Author: wangxian
 * @Date: 2022-08-16 19:00:58
 * @LastEditTime: 2022-09-01 08:59:04
 */
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config: ConfigService = app.get(ConfigService);

  const port: number = config.get<number>('PORT');

  // 配置静态资源目录
  app.useStaticAssets('public');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 全局路由前缀
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('Tiga-teamhub')
    .setDescription('Tiga-teamhub API description')
    .setVersion('1.0')
    .addTag('项目管理系统')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port, () =>
    console.log(
      `[API] 服务已经启动 ${config.get<string>(
        'BASE_URL',
      )} ${config.get<string>('BASE_URL_IP')}`,
    ),
  );
}

bootstrap();
