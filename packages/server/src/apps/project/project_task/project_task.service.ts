/*
 * @Author: wangxian
 * @Date: 2022-08-22 16:45:19
 * @LastEditTime: 2022-08-25 18:42:05
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectTaskDto } from '../dto/create-project-task.dto';
import { ProjectTask } from '../entities/project_task.entity';
import { ProjectTaskDes } from '../entities/project_task_des.entity';

@Injectable()
export class ProjectTaskService {
  @InjectRepository(ProjectTask)
  private readonly repository: Repository<ProjectTask>;

  @InjectRepository(ProjectTaskDes)
  private readonly desRepository: Repository<ProjectTaskDes>;

  async create(projectId: number, body: CreateProjectTaskDto, user: any) {
    console.log(body);

    body.project_id = projectId;
    body.creator = user.username;

    return this.repository.save(body);
  }

  async findAll(projectId: number) {
    return this.repository.findBy({ project_id: projectId, pid: -1 });
  }

  async findTaskChildren(taskId: number) {
    return this.repository.findBy({ pid: taskId });
  }

  async getTaskDetail(taskId: number) {
    const detail = await this.repository.findOneBy({ id: taskId });
    const des = await this.desRepository.findOneBy({ task_id: taskId });

    return { ...detail, des: des?.content || '' };
  }

  async addTaskDes(taskId: number, body: any, user: any) {
    console.log('body=========', taskId, body);
    // 先删除所有成员信息
    await this.desRepository.delete({ task_id: taskId });

    body.task_id = taskId;
    body.creator = user.username;

    return this.desRepository.save(body);
  }
}
