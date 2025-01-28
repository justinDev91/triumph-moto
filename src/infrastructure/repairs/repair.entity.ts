import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { RepairCost } from "@domain/values/repair/RepairCost";
import { Breakdown } from "@infrastructure/breakdowns/breakdown.entity";
import { CommonRepairActionEnum } from "@infrastructure/types/CommonRepairActionEnum";  
@Entity()
export class Repair {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the repair record" })
  id: string;

  @ManyToOne(() => Breakdown, (breakdown) => breakdown.repairs, { eager: true })
  @JoinColumn({ name: "breakdownId" })
  @ApiProperty({ description: "The breakdown associated with this repair" })
  breakdown: Breakdown;

  @Column({ type: "date" })
  @ApiProperty({ description: "The date when the repair was performed" })
  repairDate: Date;

  @Column({ type: "enum", enum: CommonRepairActionEnum, array: true })
  @ApiProperty({ description: "The actions performed during the repair" })
  actions: CommonRepairActionEnum[]; 

  @ManyToOne(() => RepairCost, { eager: true })
  @JoinColumn({ name: "costId" })
  @ApiProperty({ description: "The cost associated with the repair" })
  cost: RepairCost;
}
