import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

export enum MovementType {
  ENTRADA = 'Entrada',
  SALIDA = 'Salida',
}

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  product_id: string;

  @Column({ type: 'enum', enum: MovementType, default: null })
  movement_type: MovementType;

  @Column()
  stock_quantity: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.inventories)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
