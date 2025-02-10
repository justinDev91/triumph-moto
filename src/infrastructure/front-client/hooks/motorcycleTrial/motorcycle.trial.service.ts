import axios from 'axios';
import { MotorcycleTrialCreateDto } from './dto/create-motorcycle-trial.dto';
import { MotorcycleTrial } from '@/app/shared/models/motorcycle-trial.model';

const BASE_URL = 'http://localhost:3000/motorcycle-trials'; 

export const createMotorcycleTrial = async (
  createMotorcycleTrialDto: MotorcycleTrialCreateDto
): Promise<MotorcycleTrial | Error> => {
  try {
    const response = await axios.post(`${BASE_URL}`, createMotorcycleTrialDto);
    return response.data;
  } catch (error) {
    return new Error(`Error creating motorcycle trial: ${error}`);
  }
};


export const getAllMotorcycleTrials = async (): Promise<MotorcycleTrial[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching motorcycle trials: ${error}`);
  }
};

export const getMotorcycleTrialById = async (
  id: string
): Promise<MotorcycleTrial | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching motorcycle trial with ID ${id}: ${error}`);
  }
};

export const getMotorcycleTrialSummary = async (
  id: string
): Promise<string | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/summary`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching trial summary for ID ${id}: ${error}`);
  }
};

export const checkMotorcycleTrialStatus = async (
  id: string
): Promise<boolean | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/status`);
    return response.data;
  } catch (error) {
    return new Error(`Error checking status of motorcycle trial with ID ${id}: ${error}`);
  }
};

