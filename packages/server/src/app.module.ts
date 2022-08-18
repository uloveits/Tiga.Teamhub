/*
 * @Author: wangxian
 * @Date: 2022-08-16 19:00:58
 * @LastEditTime: 2022-08-18 10:10:53
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UserModule } from './apps/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
