/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-20 08:35:21
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', name: 'account', length: 120 })
  public account: string;

  @Column({ type: 'varchar', name: 'username', length: 120 })
  public username: string;

  @Column({ type: 'varchar', name: 'password', length: 255 })
  public password: string;

  @Column({ type: 'varchar', name: 'password_salt', length: 255 })
  public password_salt: string;

  @Column({ type: 'varchar', name: 'color', length: 10 })
  public color: string;

  @Column({ type: 'varchar', name: 'phone', length: 120 })
  public phone: string;

  @Column({ type: 'boolean', name: 'isDeleted', default: false })
  public isDeleted: boolean;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp', name: 'create_time' })
  public create_time!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'update_time' })
  public update_time!: Date;
}
