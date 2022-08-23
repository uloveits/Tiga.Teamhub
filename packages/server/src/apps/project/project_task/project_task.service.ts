/*
 * @Author: wangxian
 * @Date: 2022-08-22 16:45:19
 * @LastEditTime: 2022-08-23 09:21:52
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectTaskDto } from '../dto/create-project-task.dto';
import { ProjectTask } from '../entities/project_task.entity';

@Injectable()
export class ProjectTaskService {
  @InjectRepository(ProjectTask)
  private readonly repository: Repository<ProjectTask>;

  async create(projectId: number, body: CreateProjectTaskDto, user: any) {
    console.log(body);

    body.project_id = projectId;
    body.creator = user.username;

    return this.repository.save(body);
  }

  async findAll(projectId: number) {
    return this.repository.findBy({ project_id: projectId });
  }
}
