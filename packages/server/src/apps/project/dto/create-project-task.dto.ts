/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-23 09:21:14
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
  public assignee_color: string;

  @IsNotEmpty()
  public iteration: string;

  @IsNotEmpty()
  public classification: string;
}
