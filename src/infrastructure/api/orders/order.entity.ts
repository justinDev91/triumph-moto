import { OrderItem } from "@api/order-items/order-item.entity";
import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";

@Entity()
export class Order {
  @ApiProperty({ description: "Unique identifier for the order" })
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @ApiProperty({ description: "The date when the order was created" })
  @Column()
  orderDate: Date;

  @ApiProperty({ description: "The estimated delivery date for the order" })
  @Column({ type: "date" })
  estimatedDeliveryDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  @ApiProperty({ description: "List of items associated with the order" })
  items: OrderItem[];

  @ApiProperty({ description: "Total cost of the order" })
  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalCost: number;
}
