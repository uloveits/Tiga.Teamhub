/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-30 17:27:36
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('file', { schema: 'public' })
export class File {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120 })
  public name: string;

  @Column({ type: 'varchar', name: 'host', length: 256 })
  public host: string;

  @Column({ type: 'varchar', name: 'path', length: 256 })
  public path: string;

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
