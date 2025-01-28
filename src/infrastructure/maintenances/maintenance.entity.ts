import { MaintenanceTypeEnum } from "@infrastructure/types/MaintenanceTypeEnum";
import { Concession } from "@infrastructure/concessions/concession.entity";
import { Motorcycle } from "@infrastructure/motorcycles/motorcycle.entity";
import { ApiProperty } from "@nestjs/swagger";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the maintenance record" })
  id: string;

  @OneToOne(() => Motorcycle, (motorcycle) => motorcycle)
  @JoinColumn({ name: "motorcycleId" })
  @ApiProperty({ description: "The motorcycle associated with this maintenance record" })
  motorcycle: Motorcycle;

  @Column({ type: "enum", enum: MaintenanceTypeEnum })
  @ApiProperty({ description: "The type of maintenance performed (e.g., routine, repair)" })
  maintenanceType: MaintenanceTypeEnum;

  @Column({ type: "date" })
  @ApiProperty({ description: "The date the maintenance was performed" })
  date: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  @ApiProperty({ description: "The cost of the maintenance" })
  cost: number;

  @Column({ type: "int" })
  @ApiProperty({ description: "The mileage of the motorcycle at the time of maintenance" })
  mileageAtService: number;

  @Column({ type: "int" })
  @ApiProperty({ description: "The maintenance interval in mileage" })
  maintenanceIntervalMileage: number;

  @Column({ type: "int" })
  @ApiProperty({ description: "The maintenance interval in time (days)" })
  maintenanceIntervalTime: number;

  @OneToOne(() => Concession, (concession) => concession)
  @JoinColumn({ name: "concessionId" })
  @ApiProperty({ description: "The concession where the maintenance was performed (if applicable)" })
  concession: Concession | null;
}
