/*
 * @Author: wangxian
 * @Date: 2022-08-29 11:31:34
 * @LastEditTime: 2022-08-29 15:53:28
 */
import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';
import { Docs } from './entities/docs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsContent } from './entities/docs_content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docs, DocsContent])],
  controllers: [DocsController],
  providers: [DocsService],
})
export class DocsModule {}
