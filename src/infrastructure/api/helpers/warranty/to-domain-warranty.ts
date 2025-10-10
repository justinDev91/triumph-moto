import { WarrantyEntity } from "@domain/entities/warranty/WarrantyEntity";
import { Warranty } from "@api/warranties/warranty.entity";
import { toDomainMotorcycle } from "../motorcycle/to-domain-motorcycle";

export const toDomainWarranty = (warrantyOrm: Warranty): WarrantyEntity | Error => {

    const warrantyMotorcycle = warrantyOrm.motorcycle ? toDomainMotorcycle(warrantyOrm.motorcycle) : null
    
    if(warrantyMotorcycle instanceof Error) return warrantyMotorcycle
    
    return WarrantyEntity.create(
      warrantyOrm.id,
      warrantyMotorcycle,
      warrantyOrm.startDate,
      warrantyOrm.endDate,
      warrantyOrm.coverageDetails,
      warrantyOrm.isActive
    );
};