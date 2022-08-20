/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-20 08:36:30
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { encryptPassword, makeSalt } from '../../utils/cryptogram';
import { UserException } from 'src/filter/user-exception.filter';
import { getRandomColor } from './../../utils/utils';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async register(body: CreateUserDto): Promise<User> {
    // 制作密码盐
    const salt = makeSalt();
    // 加密密码
    const hashPwd = encryptPassword('Rz123456*', salt);

    const userResult = await this.getUserByAccount(body.account);
    if (userResult) {
      throw new UserException('用户已存在');
    } else {
      const user: User = new User();
      user.account = body.account;
      user.username = body.username;
      user.phone = body.phone;
      user.color = getRandomColor();
      user.password = hashPwd;
      user.password_salt = salt;

      return this.repository.save(user);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  public getUserById(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  public getUserByAccount(account: string): Promise<User> {
    return this.repository.findOneBy({ account });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
