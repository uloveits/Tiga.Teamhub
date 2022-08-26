/*
 * @Author: wangxian
 * @Date: 2022-08-22 15:25:02
 * @LastEditTime: 2022-08-25 18:03:21
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
    @Body() body: any,
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

  /**
   * 获取任务子任务列表
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('sub/:taskId/list')
  findTaskChildren(@Param('taskId') taskId: number) {
    return this.projectTaskService.findTaskChildren(taskId);
  }

  /**
   * 获取任务详情
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get(':taskId')
  getTaskDetail(@Param('taskId') taskId: number) {
    return this.projectTaskService.getTaskDetail(taskId);
  }

  /**
   * 添加项目描述
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post(':taskId/des')
  addTaskDes(
    @Param('taskId') taskId: number,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.projectTaskService.addTaskDes(
      taskId,
      body,
      (request as any).user,
    );
  }
}
