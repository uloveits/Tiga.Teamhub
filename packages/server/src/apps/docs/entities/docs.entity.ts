/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-29 11:47:45
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('docs', { schema: 'public' })
export class Docs {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120 })
  public name: string;

  @Column({ type: 'int4', name: 'pid', default: -1 })
  public pid: number;

  @Column({ type: 'int4', name: 'type', default: 1 })
  public type: number;

  @Column({ type: 'boolean', name: 'isDeleted', default: false })
  public isDeleted: boolean;

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
