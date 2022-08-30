/*
 * @Author: wangxian
 * @Date: 2022-08-29 18:41:03
 * @LastEditTime: 2022-08-30 18:43:17
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { Repository } from 'typeorm';

import { File } from './entities/file.entity';
import { UpdateFileDto } from './dto/update-file.dto';
import { Guid } from '../../utils/utils';

@Injectable()
export class FilesService {
  @InjectRepository(File)
  private readonly repository: Repository<File>;

  async upload(file: any, body: any, user: any) {
    console.log('upload', file, body, user);
    const guid = Guid();
    const type = file.mimetype.split('/');
    writeFileSync(`./public/upload/${guid}.${type[1]}`, file.buffer);
    const _file = new File();
    _file.name = body.name;
    _file.creator = user.username;
    _file.host = `http://localhost:8088`;
    _file.path = `/upload/${guid}.${type[1]}`;
    const res = await this.repository.save(_file);

    return res;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
