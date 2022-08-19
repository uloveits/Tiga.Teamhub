/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-19 14:33:47
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project_user', { schema: 'public' })
export class ProjectUser {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int4', name: 'user_id' })
  public user_id!: number;

  @Column({ type: 'int4', name: 'project_id' })
  public project_id!: number;

  @Column({ type: 'boolean', name: 'isManaged', default: false })
  public isManaged!: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  public createTime!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  public updateTime!: Date;
}
