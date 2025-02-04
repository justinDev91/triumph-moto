import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@infrastructure/companies/company.entity";
import { toOrmUserCreate } from "../user/to-orm-user-create";

export const toOrmCompany = (company: CompanyEntity): Company => {
    const companyOrm = new Company();
    companyOrm.name = company.name.value;  
    companyOrm.user =  company.user ? toOrmUserCreate(company.user) : null; 
    return companyOrm;
}