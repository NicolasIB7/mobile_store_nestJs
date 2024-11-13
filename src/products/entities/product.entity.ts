import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Stock } from './stock.entity';
import { Inventory } from './inventory.entity';
import { Spec } from './specs.entity';

// Puedo inferir en el campo @column el tipo de columna, si bien ya lo hago con el nombre de la propiedad, hacerlo en la propiedad
//es más seguro, por ejemplo un campo que es number pero quiero que sea también decimal.

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  price: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => Spec, (spec) => spec.product)
  specs: Spec[];
}