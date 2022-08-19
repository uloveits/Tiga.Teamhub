/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-19 18:46:56
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  public color: string;

  @IsString()
  public des: string;
}
