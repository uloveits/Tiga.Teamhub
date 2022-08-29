/*
 * @Author: wangxian
 * @Date: 2022-08-18 10:10:48
 * @LastEditTime: 2022-08-29 15:39:01
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('docs_content', { schema: 'public' })
export class DocsContent {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'int4', name: 'doc_id' })
  public doc_id!: number;

  @Column({ type: 'text', name: 'content' })
  public content!: string;

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
