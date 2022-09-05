/*
 * @Author: wangxian
 * @Date: 2022-09-01 18:29:59
 * @LastEditTime: 2022-09-03 10:16:11
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SiteService } from './site.service';
import { UpdateSiteDto } from './dto/update-site.dto';

@ApiBearerAuth()
@ApiTags('官网菜单管理')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  /**
   *添加菜单
   * @param createDocDto
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: any) {
    return this.siteService.create(body);
  }

  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(+id, updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id);
  }
}
