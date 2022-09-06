import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { Guid } from '../../utils/utils';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entities/book.entity';

@Injectable()
export class BooksService {
  @InjectRepository(Books)
  private readonly repository: Repository<Books>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async addBooks(file: any, body: any, user: any) {
    console.log('upload', file, body, user);
    // const guid = Guid();
    // const type = file.mimetype.split('/');
    // writeFileSync(`./public/books/${guid}.${type[1]}`, file.buffer);
    // const _books = new Books();
    // _books.name = body.name;
    // _books.creator = user.username;

    // const res = await this.repository.save(_books);

    // return res;
  }

  create(createBookDto: CreateBookDto) {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
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
