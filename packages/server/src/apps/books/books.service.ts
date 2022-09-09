/*
 * @Author: wangxian
 * @Date: 2022-09-07 08:24:07
 * @LastEditTime: 2022-09-07 14:01:14
 */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, writeFile } from 'fs';
import { UserException } from '../../filter/user-exception.filter';
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
    const type = file.originalname.split('.');

    const outputFolder = './public/books';
    if (existsSync(outputFolder)) {
      const path = `/books/${body.name}.${type[type.length - 1]}`;
      writeFile(`./public${path}`, file.buffer, (error) => {
        if (error) {
          throw new UserException('文件上传失败');
          console.log(error);
        }
      });
      const _books = new Books();
      _books.name = body.name;
      _books.tags = body.tags;
      _books.sort = body.sort;
      _books.creator = user.username;
      _books.url = `${this.config.get<string>('BASE_URL_IP')}${path}`;

      const res = await this.repository.save(_books);

      return res;
    }
    throw new UserException('文件上传失败');
  }

  async getAllBook() {
    const qb = this.repository.createQueryBuilder('books');
    qb.where({ isDeleted: false });
    qb.orderBy('sort', 'ASC');
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
