import { DocsContent } from './entities/docs_content.entity';
/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-08-29 16:44:48
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { Docs } from './entities/docs.entity';

@Injectable()
export class DocsService {
  @InjectRepository(Docs)
  private readonly repository: Repository<Docs>;

  @InjectRepository(DocsContent)
  private readonly docContentRepository: Repository<DocsContent>;

  create(createDocDto: CreateDocDto) {
    return 'This action adds a new doc';
  }

  getAllListByType(type: number) {
    return this.repository.findBy({ type, isDeleted: false });
  }

  async addDocContent(docId: number, body: any, user: any) {
    console.log('body=========', docId, body);

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
