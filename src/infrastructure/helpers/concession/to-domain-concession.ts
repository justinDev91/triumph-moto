import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@infrastructure/concessions/concession.entity";

import { toDomainUser } from "../user/to-domain-user"; 
import { toDomainCompany } from "../company/to-domain-company"; 
import { UserEntity } from "@domain/entities/user/UserEntity";
import { CompanyEntity } from "@domain/entities/company/CompanyEntity";

export const toDomainConcession = (concessionOrm: Concession): ConcessionEntity => {
  const user = toDomainUser(concessionOrm.user);
  const company = toDomainCompany(concessionOrm.company);

  return ConcessionEntity.create(
    concessionOrm.id,
    concessionOrm.name,
    user as UserEntity,
    company as CompanyEntity,
    concessionOrm.createdAt,
    concessionOrm.updatedAt
  ) as ConcessionEntity;
};
