import { ProjectTask } from './entities/project_task.entity';
/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-22 16:51:11
 */
import { Project } from './entities/project.entity';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUser } from './entities/project_user.entity';
import { ProjectTaskController } from './project_task/project_task.controller';
import { ProjectTaskService } from './project_task/project_task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUser, ProjectTask])],
  controllers: [ProjectController, ProjectTaskController],
  providers: [ProjectService, ProjectTaskService],
})
export class ProjectModule {}
