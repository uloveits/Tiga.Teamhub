/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-18 10:59:19
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public account: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  public password: string;

  public phone: string;

  public isDeleted: boolean;
}
