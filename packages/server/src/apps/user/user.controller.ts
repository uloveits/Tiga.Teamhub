/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-18 11:09:37
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Post('register')
  public register(@Body() body: CreateUserDto) {
    return this.service.register(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.service.getUserById(+id);
  }

  @Get('account/:account')
  getUserByAccount(@Param('account') account: string) {
    return this.service.getUserByAccount(account);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
