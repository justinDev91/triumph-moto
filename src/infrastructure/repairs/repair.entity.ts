import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Breakdown } from "@infrastructure/breakdowns/breakdown.entity";
import { CommonRepairActionEnum } from "@infrastructure/types/CommonRepairActionEnum";  
@Entity()
export class Repair {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({ description: "Unique identifier for the repair record" })
  id: string;

  @ManyToOne(() => Breakdown, (breakdown) => breakdown.repairs)
  @ApiProperty({ description: "The breakdown associated with this repair" })
  breakdown: Breakdown;

  @Column({ type: "date" })
  @ApiProperty({ description: "The date when the repair was performed" })
  repairDate: Date;

  @Column({
    type: "text",
    transformer: {
      to: (actions: CommonRepairActionEnum[]): string => actions.join(","), 
      from: (value: string): CommonRepairActionEnum[] => value.split(",") as CommonRepairActionEnum[], 
    },
  })
  @ApiProperty({ description: "The actions performed during the repair" })
  actions: CommonRepairActionEnum[];  

  @ApiProperty({ description: "The cost associated with the repair" })
  cost: number;
}
