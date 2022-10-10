/*
 * @Author: wangxian
 * @Date: 2022-09-07 08:24:07
 * @LastEditTime: 2022-09-07 10:02:42
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  addBooks(@UploadedFile() file, @Body() body, @Req() request: Request) {
    console.log('file', file, body);
    return this.booksService.addBooks(file, body, (request as any).user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('list')
  getAllBook(@Body() body: any) {
    return this.booksService.getAllBook(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
