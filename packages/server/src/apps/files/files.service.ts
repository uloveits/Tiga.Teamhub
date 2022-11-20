/*
 * @Author: wangxian
 * @Date: 2022-08-29 18:41:03
 * @LastEditTime: 2022-09-01 08:59:38
 */
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writeFileSync } from 'fs';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { File } from './entities/file.entity';
import { UpdateFileDto } from './dto/update-file.dto';
import { Guid } from '../../utils/utils';

@Injectable()
export class FilesService {
  @InjectRepository(File)
  private readonly repository: Repository<File>;

  @Inject(ConfigService)
  private readonly config: ConfigService;

  async upload(file: any, body: any, user: any) {
    console.log('upload', file, body, user);
    const _file = new File();
    _file.name = body.name;
    _file.creator = user.username;
    _file.host = this.config.get<string>('BASE_URL_IP');
    _file.path = file.path.replace('public', '');
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
