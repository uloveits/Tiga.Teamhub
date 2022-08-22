/*
 * @Author: wangxian
 * @Date: 2022-08-22 15:25:02
 * @LastEditTime: 2022-08-22 17:12:29
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProjectTaskDto } from '../dto/create-project-task.dto';
import { Request } from 'express';
import { ProjectTaskService } from './project_task.service';

@Controller('project/task')
export class ProjectTaskController {
  constructor(private readonly projectTaskService: ProjectTaskService) {}

  /**
   * 创建任务
   * @param createProjectTaskDto
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId')
  create(
    @Param('projectId') projectId: number,
    @Body() body: CreateProjectTaskDto,
    @Req() request: Request,
  ) {
    return this.projectTaskService.create(
      projectId,
      body,
      (request as any).user,
    );
  }

  /**
   * 获取项目的任务列表
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post(':projectId/list')
  findAll(@Param('projectId') projectId: number) {
    return this.projectTaskService.findAll(projectId);
  }
}
