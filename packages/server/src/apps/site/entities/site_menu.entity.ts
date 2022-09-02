/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-09-02 08:30:12
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_menu', { schema: 'public' })
export class SiteMenu {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', name: 'name', length: 120 })
  public name: string;

  @Column({ type: 'varchar', name: 'route', length: 255 })
  public route: string;

  @Column({ type: 'varchar', name: 'comp', length: 255 })
  public comp: string;

  @Column({ type: 'int4', name: 'docId' })
  public docId: number;

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
