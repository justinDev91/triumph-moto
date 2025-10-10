import { Breakdown } from "@api/breakdowns/breakdown.entity";
import { BreakdownEntity } from "@domain/entities/breakdown/BreakdownEntity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";
import { MotorcycleEntity } from "@domain/entities/motorcycle/MotorcycleEntity";
import { toDomainWarranty } from "../warranty/to-domain-warranty";
import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";

export const toDomainBreakdown = (breakdown: Breakdown): BreakdownEntity => {

  const domainBreakdown = BreakdownEntity.create(
    breakdown.id,
    breakdown.motorcycle ? toDomainMotorcycle(breakdown.motorcycle) as MotorcycleEntity: null,
    breakdown.description,
    breakdown.reportedDate,
    breakdown.warranty ? toDomainWarranty(breakdown.warranty) as WarrantyEntity: null,
    // breakdown.repairs 
  ) as BreakdownEntity;


  return domainBreakdown;
};
