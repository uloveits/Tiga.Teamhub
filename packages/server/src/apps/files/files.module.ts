/*
 * @Author: wangxian
 * @Date: 2022-08-29 18:41:03
 * @LastEditTime: 2022-08-30 17:23:41
 */
import { BadRequestException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { File } from './entities/file.entity';
import * as dayjs from 'dayjs';
import { checkDirAndCreate, Guid } from '../../utils/utils';
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: (req, file, cb) => {
          // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
          const mimeType = file.mimetype.split('/')[1];
          let temp = 'other';
          image.filter((item) => item === mimeType).length > 0
            ? (temp = 'image')
            : '';
          video.filter((item) => item === mimeType).length > 0
            ? (temp = 'video')
            : '';
          audio.filter((item) => item === mimeType).length > 0
            ? (temp = 'audio')
            : '';
          const filePath = `public/uploads/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`;
          checkDirAndCreate(filePath); // 判断文件夹是否存在，不存在则自动生成
          return cb(null, `./${filePath}`);
        },
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const fileType = file.originalname.split('.');
          const filename = `${Guid()}.${fileType[fileType.length - 1]}`;
          return cb(null, filename);
        },
      }),
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        let temp = 'other';
        image.filter((item) => item === mimeType).length > 0
          ? (temp = 'image')
          : '';
        video.filter((item) => item === mimeType).length > 0
          ? (temp = 'video')
          : '';
        audio.filter((item) => item === mimeType).length > 0
          ? (temp = 'audio')
          : '';
        if (temp === 'other') {
          return cb(new BadRequestException('文件格式错误！'), false);
        }
        return cb(null, true);
      },
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
