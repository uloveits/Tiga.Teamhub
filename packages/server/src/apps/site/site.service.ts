/*
 * @Author: wangxian
 * @Date: 2022-09-01 18:29:59
 * @LastEditTime: 2022-09-03 10:17:42
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SiteMenu } from './entities/site_menu.entity';

@Injectable()
export class SiteService {
  @InjectRepository(SiteMenu)
  private readonly repository: Repository<SiteMenu>;

  /**
   * 保存菜单
   * @param body
   * @returns
   */
  create(body: any) {
    return this.repository.save(body);
  }

  findAll() {
    return `This action returns all site`;
  }

  findOne(id: number) {
    return `This action returns a #${id} site`;
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return `This action updates a #${id} site`;
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
