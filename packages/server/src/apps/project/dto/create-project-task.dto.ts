/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-22 17:06:55
 */
import { IsNotEmpty } from 'class-validator';

export class CreateProjectTaskDto {
  @IsNotEmpty()
  public name: string;

  public project_id: number;

  public creator: string;

  @IsNotEmpty()
  public stage: string;

  @IsNotEmpty()
  public startTime: string;

  @IsNotEmpty()
  public endTime: string;

  @IsNotEmpty()
  public assignee: string;

  @IsNotEmpty()
  public iteration: string;

  @IsNotEmpty()
  public classification: string;
}
