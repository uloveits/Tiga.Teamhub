/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-22 17:02:48
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project_task', { schema: 'public' })
export class ProjectTask {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int4', name: 'pid', default: -1 })
  public pid!: number;

  @Column({ type: 'int4', name: 'project_id' })
  public project_id!: number;

  @Column({ type: 'varchar', name: 'name', length: 255 })
  public name!: string;

  @Column({ type: 'varchar', name: 'stage', length: 10 })
  public stage!: string;

  @Column({ type: 'int4', name: 'workflow', default: 1 })
  public workflow!: string;

  @Column({ type: 'int4', name: 'completeRate', default: 0 })
  public completeRate!: number;

  @Column({ type: 'date', name: 'startTime' })
  public startTime!: string;

  @Column({ type: 'date', name: 'endTime' })
  public endTime!: string;

  @Column({ type: 'varchar', name: 'assignee', length: 255, nullable: true })
  public assignee!: string;

  @Column({ type: 'varchar', name: 'iteration', length: 10 })
  public iteration!: string;

  @Column({ type: 'varchar', name: 'classification', length: 40 })
  public classification!: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  public create_time!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  public update_time!: Date;

  @Column({ type: 'varchar', name: 'creator', length: 10 })
  public creator!: string;
}
