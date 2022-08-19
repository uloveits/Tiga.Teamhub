/*
 * @Author: wangxian
 * @Date: 2022-08-18 15:57:22
 * @LastEditTime: 2022-08-19 11:40:21
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_SECRET } from './../../../app.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      userId: payload.id,
      account: payload.account,
      username: payload.username,
      role: payload.role,
    };
  }
}
