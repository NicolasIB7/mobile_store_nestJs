import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Spec {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  product_id: string;

  @Column()
  storage: string;

  @Column()
  memory_ram: string;

  @Column()
  screen_size: string;

  @Column()
  batery: string;

  @Column()
  color: string;

  @Column()
  weight: string;

  @Column()
  processor: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Product, (product) => product.specs,{onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({ name: 'product_id' })
  product: Product;

}
