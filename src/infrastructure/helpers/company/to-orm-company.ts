import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@infrastructure/companies/company.entity";
import { toOrmUser } from "../user/to-orm-user";

export const toOrmCompany = (company: CompanyEntity): Company => {
    const companyOrm = new Company();
    companyOrm.id = company.id;
    companyOrm.name = company.name.value;  
    companyOrm.user = toOrmUser(company.user); 
    // companyOrm.drivers
    // companyOrm.motorcycles
    // companyOrm.concessions
    companyOrm.createdAt = company.createdAt;
    companyOrm.updatedAt = company.updatedAt;
  
    return companyOrm;
}