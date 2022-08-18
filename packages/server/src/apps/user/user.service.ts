/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-18 17:21:13
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { encryptPassword, makeSalt } from '../../utils/cryptogram';
import { UserException } from 'src/filter/user-exception.filter';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public async register(body: CreateUserDto): Promise<User> {
    // 制作密码盐
    const salt = makeSalt();
    // 加密密码
    const hashPwd = encryptPassword('Rz123456*', salt);
    let user: User = new User();

    user = await this.getUserByAccount(body.account);
    if (user) {
      console.log('用户已存在');
      throw new UserException('用户已存在');
    } else {
      user.account = body.account;
      user.username = body.username;
      user.password = hashPwd;
      user.password_salt = salt;
      user.phone = body.phone;
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
