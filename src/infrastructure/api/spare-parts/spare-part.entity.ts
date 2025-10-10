import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "int" })
  quantityInStock: number;

  @Column({ type: "int" })
  criticalLevel: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cost: number;

  @Column({ type: "int", default: 0 })
  totalUsage: number;

  @Column({ type: "int", default: 0 })
  reservedStock: number;
}
