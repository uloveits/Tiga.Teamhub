/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-18 16:55:53
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
