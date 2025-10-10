import { Company } from '@/app/shared/models/company.model';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/companies'; 


export const getAllCompanies = async (): Promise<Company[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching companies ${error}`);
  }
};

export const getCompanyById = async (companyId: string): Promise<Company | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${companyId}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching company ${error}`);
  }
};

