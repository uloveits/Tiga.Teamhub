/*
 * @Author: wangxian
 * @Date: 2022-08-18 18:07:57
 * @LastEditTime: 2022-08-25 16:52:00
 */
import { IsNotEmpty } from 'class-validator';

export class CreateProjectTaskDto {
  @IsNotEmpty()
  public name: string;

  public pid: number;

  public completeRate: number;

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
