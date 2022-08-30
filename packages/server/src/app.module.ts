/*
 * @Author: wangxian
 * @Date: 2022-08-16 19:00:58
 * @LastEditTime: 2022-08-29 19:18:27
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UserModule } from './apps/user/user.module';
import { AuthModule } from './apps/auth/auth.module';
import { UserController } from './apps/user/user.controller';
import { ProjectModule } from './apps/project/project.module';
import { DocsModule } from './apps/docs/docs.module';
import { FilesModule } from './apps/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    ProjectModule,
    DocsModule,
    FilesModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
