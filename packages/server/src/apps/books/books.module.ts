import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books } from './entities/book.entity';
import * as dayjs from 'dayjs';
import { checkDirAndCreate, Guid } from '../../utils/utils';
@Module({
  imports: [
    TypeOrmModule.forFeature([Books]),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: (req, file, cb) => {
          const prefix = 'public';
          const filePath = `books/${dayjs().format('YYYY-MM-DD')}`;
          checkDirAndCreate(`${prefix}/${filePath}`); // 判断文件夹是否存在，不存在则自动生成
          return cb(null, `${prefix}/${filePath}`);
        },
        filename: (req, file, cb) => {
          console.log('在此处自定义保存后的文件名称', file);

          const fileType = file.originalname.split('.');
          const filename = `${Guid()}.${fileType[fileType.length - 1]}`;
          return cb(null, filename);
        },
      }),
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        console.log('fileFilter', file, mimeType);

        const temp = 'pdf';
        if (temp !== mimeType) {
          return cb(new BadRequestException('文件格式错误！'), false);
        }
        return cb(null, true);
      },
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
