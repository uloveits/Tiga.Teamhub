import { DocsContent } from './entities/docs_content.entity';
/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-09-01 15:52:22
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Docs } from './entities/docs.entity';

@Injectable()
export class DocsService {
  @InjectRepository(Docs)
  private readonly repository: Repository<Docs>;

  @InjectRepository(DocsContent)
  private readonly docContentRepository: Repository<DocsContent>;

  /**
   * 添加文档
   * @returns
   */
  create(body: any, user: any) {
    console.log('=====添加文档===', body);
    if (!body?.id) {
      body.type = parseInt(body.type);
      body.creator = user.username;
    }

    return this.repository.save(body);
  }

  /**
   * 获取文档目录列表
   * @returns
   */
  async getAllListByType(type: number) {
    const typeRes = await this.repository.findOneBy({ id: type });

    const qb = this.repository.createQueryBuilder('docs');
    qb.where({ type, isDeleted: false });
    qb.orderBy('sort', 'ASC');

    const res = await qb.getMany();
    return [...[typeRes], ...res];
  }

  /**
   * 获取文档种类列表
   * @returns
   */
  async getAllTypeList() {
    const qb = this.repository.createQueryBuilder('docs');
    qb.where({ pid: -1, isDeleted: false });
    qb.orderBy('sort', 'ASC');
    return qb.getMany();
  }

  /**
   * 添加文档内容
   * @param request
   * @returns
   */
  async addDocContent(docId: number, body: any, user: any) {
    const resDocData = await this.docContentRepository.findOneBy({
      doc_id: docId,
    });

    body.doc_id = docId;
    body.creator = user.username;
    if (resDocData) {
      body.id = resDocData.id;
    }
    return this.docContentRepository.save(body);
  }

  /**
   * 获取文档内容
   * @param id
   * @returns
   */
  getDocConetnt(docId: number) {
    return this.docContentRepository.findOneBy({
      doc_id: docId,
    });
  }

  /**
   * 删除文档目录
   * @param id
   * @returns
   */
  remove(docId: number) {
    return this.repository.save({ id: docId, isDeleted: true });
  }
}
