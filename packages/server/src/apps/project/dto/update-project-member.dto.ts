/*
 * @Author: wangxian
 * @Date: 2022-08-19 16:16:54
 * @LastEditTime: 2022-08-19 16:36:31
 */

import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateProjectMemberDto {
  @IsNotEmpty()
  public projectId: number;

  @IsArray()
  @IsNotEmpty()
  public userIds: { id: number; isManaged: boolean }[];
}
