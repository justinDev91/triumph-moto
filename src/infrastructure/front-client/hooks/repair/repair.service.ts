import axios from 'axios';
import { CreateRepairDto } from './dto/create-repair.dto';
import { CommonRepairActionEnum, Repair } from '@/app/shared/models/repair.model';

const BASE_URL = 'http://localhost:3000/repair';

export const createRepair = async (
  createRepairDto: CreateRepairDto
): Promise<Repair | Error> => {
  try {
    const response = await axios.post(`${BASE_URL}`, createRepairDto);
    return response.data;
  } catch (error) {
    return new Error(`Error creating repair: ${error}`);
  }
};

export const getAllRepairs = async (): Promise<Repair[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching repairs: ${error}`);
  }
};

export const getRepairById = async (
  id: string
): Promise<Repair | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching repair with ID ${id}: ${error}`);
  }
};

export const updateRepairActions = async (
  repairId: string,
  actions: CommonRepairActionEnum[]
): Promise<void | Error> => {
  try {
    await axios.put(`${BASE_URL}/${repairId}/actions`, actions);
  } catch (error) {
    return new Error(`Error updating repair actions: ${error}`);
  }
};
