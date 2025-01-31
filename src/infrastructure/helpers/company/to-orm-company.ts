import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@infrastructure/companies/company.entity";
import { toOrmUser } from "../user/to-orm-user";

export const toOrmCompany = (company: CompanyEntity): Company => {
    const companyOrm = new Company();
    companyOrm.name = company.name.value;  
    companyOrm.user =  companyOrm.user  ? toOrmUser(company.user) : null; 
    return companyOrm;
}