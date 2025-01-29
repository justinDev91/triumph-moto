import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { Warranty } from "@infrastructure/warranties/warranty.entity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";

export const toDomainWarranty = (warrantyOrm: Warranty): WarrantyEntity | Error => {

    const warrantyMotorcycle = toDomainMotorcycle(warrantyOrm.motorcycle)

    if(warrantyMotorcycle instanceof Error) return warrantyMotorcycle

    console.log("toDomainWarranty", warrantyOrm)
    
    return WarrantyEntity.create(
      warrantyOrm.id,
      warrantyMotorcycle,
      warrantyOrm.startDate,
      warrantyOrm.endDate,
      warrantyOrm.coverageDetails,
      warrantyOrm.isActive
    );
};