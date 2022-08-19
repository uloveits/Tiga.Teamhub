/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-19 18:44:05
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project', { schema: 'public' })
export class Project {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120 })
  public name: string;

  @Column({ type: 'varchar', name: 'color', length: 10 })
  public color: string;

  @Column({ type: 'varchar', name: 'des', length: 255 })
  public des: string;

  @Column({ type: 'boolean', name: 'isDeleted', default: false })
  public isDeleted: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  public createTime!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  public updateTime!: Date;
}
