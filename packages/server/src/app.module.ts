/*
 * @Author: wangxian
 * @Date: 2022-08-16 19:00:58
 * @LastEditTime: 2022-09-01 09:22:09
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
import { getEnvPath } from './common/env/env.hepler';
import { SiteModule } from './apps/site/site.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/env`);

console.log('envFilePath', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    ProjectModule,
    DocsModule,
    FilesModule,
    SiteModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
