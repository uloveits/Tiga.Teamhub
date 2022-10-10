/*
 * @Author: wangxian
 * @Date: 2022-09-07 08:24:07
 * @LastEditTime: 2022-09-07 14:01:14
 */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entities/book.entity';

@Injectable()
export class BooksService {
  @InjectRepository(Books)
  private readonly repository: Repository<Books>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async addBooks(file: any, body: any, user: any) {
    const _books = new Books();
    _books.name = body.name;
    _books.tags = body.tags;
    _books.sort = body.sort;
    _books.creator = user.username;
    _books.url = `${this.config.get<string>('BASE_URL_IP')}/${file.path.replace(
      'public/',
      '',
    )}`;

    console.log(_books);

    const res = await this.repository.save(_books);

    return res;
  }

  async getAllBook(body: any) {
    const qb = this.repository.createQueryBuilder('books');
    qb.where({ isDeleted: false });
    qb.orderBy('sort', 'ASC');
    if (body?.page && body?.size) {
      qb.skip(body.size * (body.page - 1));
      qb.take(body.size);
    }
    return qb.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
