import { SparePart } from "@infrastructure/spart-parts/spart-part.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  
  @Entity()
  export class OrderItem {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @OneToOne(() => SparePart, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "sparePartId" })
    sparePart: SparePart;
  
    @Column({ type: "int" })
    quantityOrdered: number;
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    costPerUnit: number;
  
    @Column({ type: "int", default: 0 })
    deliveredQuantity: number;
  
}
  