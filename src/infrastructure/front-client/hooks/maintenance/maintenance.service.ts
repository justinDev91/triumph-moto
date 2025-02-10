import { Maintenance } from '@/app/shared/models/maintenance.model';
import axios from 'axios';
import { CreateMaintenanceDto } from './dto/create-maintenance.tdo';

const BASE_URL = 'http://localhost:3000/maintenance';


export const createMaintenance = async (
  maintenanceData: CreateMaintenanceDto
): Promise<Maintenance | Error> => {
  try {
    const response = await axios.post(`${BASE_URL}`, maintenanceData);
    return response.data;
  } catch (error) {
    return new Error(`Error creating maintenance: ${error}`);
  }
};

export const getAllMaintenanceRecords = async (): Promise<Maintenance[] | Error> => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data;
    } catch (error) {
      return new Error(`Error fetching all maintenance records: ${error}`);
    }
  };

export const getMaintenanceById = async (id: string): Promise<Maintenance | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching maintenance with id ${id}: ${error}`);
  }

};
