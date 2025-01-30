import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { SparePart } from "@infrastructure/spare-parts/spare-part.entity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the order item" })
  id: string;

  @OneToOne(() => SparePart, { eager: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "sparePartId" })
  @ApiProperty({ description: "The spare part associated with this order item" })
  sparePart: SparePart;

  @Column({ type: "int" })
  @ApiProperty({ description: "The quantity of the spare part ordered"})
  quantityOrdered: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  @ApiProperty({ description: "The cost per unit of the spare part"})
  costPerUnit: number;

  @Column({ type: "int", default: 0 })
  @ApiProperty({ description: "The quantity of the spare part that has been delivered"})
  deliveredQuantity: number;
}
