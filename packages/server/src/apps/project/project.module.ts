/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-19 11:33:16
 */
import { Project } from './entities/project.entity';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUser } from './entities/project_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUser])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
