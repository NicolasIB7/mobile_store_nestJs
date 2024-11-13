import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
import { Product } from './product.entity';

  
  @Entity()
  export class Stock {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
  
    @Column()
    product_id: string;
  
    @Column()
    total_stock: number;
  
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ManyToOne(() => Product, product => product.stocks)
    @JoinColumn({ name: 'product_id' })  
    product: Product;
  }