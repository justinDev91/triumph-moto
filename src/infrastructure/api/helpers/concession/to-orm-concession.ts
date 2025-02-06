import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@api/concessions/concession.entity";
import { toOrmUser } from "../user/to-orm-user";
import { toOrmCompany } from "../company/to-orm-company";

 export const toOrmConcession = (concession: ConcessionEntity): Concession => {
    const concessionOrm = new Concession();
    concessionOrm.id = concession.id;
    concessionOrm.name = concession.name.value;
    concessionOrm.user = toOrmUser(concession.user);
    // concessionOrm.motorcycles = toOrmMotorcycle(concession.motorcycles);
    concessionOrm.createdAt = concession.createdAt;
    concessionOrm.updatedAt = concession.updatedAt;
    concessionOrm.company = toOrmCompany(concession.company);
  
    return concessionOrm;
}