import { CompanyEntity } from "@domain/entities/company/CompanyEntity";
import { Company } from "@api/companies/company.entity";
import { toOrmUserCreate } from "../user/to-orm-user-create";

export const toOrmCompanyCreate = (company: CompanyEntity): Company => {
    const companyOrm = new Company();
    companyOrm.id = company.id;  
    companyOrm.name = company.name.value;  
    companyOrm.user =  company.user ? toOrmUserCreate(company.user) : null; 
    return companyOrm;
}