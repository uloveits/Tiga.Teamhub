/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-09-01 16:25:15
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DocsService } from './docs.service';

@ApiBearerAuth()
@ApiTags('文档管理')
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  /**
   * 添加文档
   * @param createDocDto
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: any, @Req() request: Request) {
    return this.docsService.create(body, (request as any).user);
  }

  /**
   * 获取文档目录列表
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Get('type/:type')
  getAllListByType(@Param('type') type: number) {
    return this.docsService.getAllListByType(type);
  }

  /**
   * 获取文档种类列表
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Get('types')
  getAllTypeList() {
    return this.docsService.getAllTypeList();
  }

  /**
   * 添加文档内容
   * @param request
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('content/:docId')
  addDocContent(
    @Param('docId') docId: number,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return this.docsService.addDocContent(docId, body, (request as any).user);
  }

  /**
   * 获取文档内容
   * @param id
   * @returns
   */
  // @UseGuards(AuthGuard('jwt'))
  @Get('content/:docId')
  getDocConetnt(@Param('docId') docId: number) {
    return this.docsService.getDocConetnt(docId);
  }

  /**
   * 删除文档目录
   * @param docId
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post(':docId/delete')
  remove(@Param('docId') docId: number) {
    return this.docsService.remove(docId);
  }
}
