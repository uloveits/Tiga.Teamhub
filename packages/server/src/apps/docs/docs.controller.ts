/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-08-29 16:45:09
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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DocsService } from './docs.service';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';

@ApiBearerAuth()
@ApiTags('文档管理')
@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post()
  create(@Body() createDocDto: CreateDocDto) {
    return this.docsService.create(createDocDto);
  }

  /**
   * 获取文档列表
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('type/:type')
  getAllListByType(@Param('type') type: number) {
    return this.docsService.getAllListByType(type);
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
  @UseGuards(AuthGuard('jwt'))
  @Get('content/:docId')
  getDocConetnt(@Param('docId') docId: number) {
    return this.docsService.getDocConetnt(docId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocDto: UpdateDocDto) {
    return this.docsService.update(+id, updateDocDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docsService.remove(+id);
  }
}
