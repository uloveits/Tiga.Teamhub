/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-18 17:22:31
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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(AuthService)
  private readonly authService: AuthService;

  /**
   * 用户注册
   * @param body
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  public register(@Body() body: CreateUserDto) {
    return this.userService.register(body);
  }

  /**
   * 用户登录
   * @param body
   * @returns
   */
  @Post('login')
  public async login(@Body() body: LoginUserDto) {
    console.log('JWT验证 - Step 1: 用户请求登录');
    const authResult = await this.authService.validateUser(
      body.account,
      body.password,
    );
    if (authResult) {
      return this.authService.certificate(authResult);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * t通过Id获取用户信息
   * @param id
   * @returns
   */
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  /**
   * 通过账号获取用户信息
   * @param account
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('account/:account')
  getUserByAccount(@Param('account') account: string) {
    return this.userService.getUserByAccount(account);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
