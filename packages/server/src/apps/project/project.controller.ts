/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-22 17:08:40
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';

@ApiBearerAuth()
@ApiTags('项目管理')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * 创建项目
   * @param createProjectDto
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Req() request: Request) {
    return this.projectService.create(createProjectDto, (request as any).user);
  }

  /**
   * 获取当前用户项目列表
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  findAll(@Req() request: Request) {
    return this.projectService.findAll((request as any).user);
  }

  /**
   * 更新项目成员信息
   * @param id
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('member/update')
  updateMember(@Body() body: UpdateProjectMemberDto) {
    return this.projectService.updateMember(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
