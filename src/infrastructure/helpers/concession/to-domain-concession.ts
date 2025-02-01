import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@infrastructure/concessions/concession.entity";

import { toDomainUser } from "../user/to-domain-user"; 
import { toDomainCompany } from "../company/to-domain-company"; 
import { UserEntity } from "@domain/entities/user/UserEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";

export const toDomainConcession = (concessionOrm: Concession): ConcessionEntity => {

  return ConcessionEntity.create(
    concessionOrm.id,
    concessionOrm.name,
    concessionOrm.user ? toDomainUser(concessionOrm.user) as UserEntity : null,
    concessionOrm.company ? toDomainCompany(concessionOrm.company) as CompanyEntity : null,
    concessionOrm.createdAt,
    concessionOrm.updatedAt
  ) as ConcessionEntity;
};
