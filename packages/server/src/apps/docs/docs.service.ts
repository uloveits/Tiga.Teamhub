import { DocsContent } from './entities/docs_content.entity';
/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-08-30 16:15:43
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDocDto } from './dto/update-doc.dto';
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
    body.type = parseInt(body.type);
    body.creator = user.username;

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
    return this.repository.findBy({ pid: -1, isDeleted: false });
  }

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

  getDocConetnt(docId: number) {
    return this.docContentRepository.findOneBy({
      doc_id: docId,
    });
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
  }

  remove(id: number) {
    return `This action removes a #${id} doc`;
  }
}
