import { UserException } from 'src/filter/user-exception.filter';
/*
 * @Author: wangxian
 * @Date: 2022-08-18 15:55:23
 * @LastEditTime: 2022-08-20 08:40:40
 */
import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  // JWT验证 - Step 2: 校验用户信息
  async validateUser(account: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.getUserByAccount(account);
    if (user && !user.isDeleted) {
      const hashedPassword = user.password;
      const salt = user.password_salt;
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        // 密码正确
        return user;
      } else {
        // 密码错误
        throw new UserException('密码错误');
      }
    }
    // 找不到该用户
    throw new UserException('找不到该用户');
  }
  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      account: user.account,
      username: user.username,
      color: user.color,
      id: user.id,
    };
    console.log(
      'JWT验证 - Step 3: 处理 jwt 签证',
      `payload: ${JSON.stringify(payload)}`,
    );
    try {
      const token = this.jwtService.sign(payload);
      return { ...payload, token };
    } catch (error) {
      throw new UserException('账号密码错误');
    }
  }
}
