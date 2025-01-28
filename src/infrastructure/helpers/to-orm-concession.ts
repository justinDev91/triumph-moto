import { ConcessionEntity } from "@domain/entities/concession/ConcessionEntity";
import { Concession } from "@infrastructure/concessions/concession.entity";
import { toOrmUser } from "./to-orm-user";
import { toOrmCompany } from "./to-orm-company";

 export const toOrmConcession = (concession: ConcessionEntity): Concession => {
    const concessionOrm = new Concession();
    concessionOrm.id = concession.id;
    concessionOrm.name = concession.name.value;
    concessionOrm.user = toOrmUser(concession.user);
    //motorcycles
    concessionOrm.createdAt = concession.createdAt;
    concessionOrm.updatedAt = concession.updatedAt;
    concessionOrm.company = toOrmCompany(concession.company);
  
    return concessionOrm;
}