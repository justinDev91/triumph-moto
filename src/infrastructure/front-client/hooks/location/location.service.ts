import { CreateLocationDto } from './../../../api/locations/dto/create-location.dto';
import { Location } from '@/app/shared/models/location.model';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/locations'; 


export const createLocation = async (locationData: CreateLocationDto): Promise<Location| Error> => {
  try {
    const response = await axios.post(`${BASE_URL}`, locationData);
    return response.data;
  } catch (error) {
    return new Error(`Error creating location: ${error}`);
  }
};

export const getLocationById = async (id: string): Promise<Location | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching location with id ${id}: ${error}`);
  }
};

export const getAllLocations = async (): Promise<Location[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching all locations: ${error}`);
  }
};


export const endLocation = async (id: string): Promise<void | Error> => {
  try {
    await axios.put(`${BASE_URL}/${id}/end`);
  } catch (error) {
    return new Error(`Error ending location with id ${id}: ${error}`);
  }
};

export const cancelLocation = async (id: string): Promise<void | Error> => {
  try {
    await axios.put(`${BASE_URL}/${id}/cancel`);
  } catch (error) {
    return new Error(`Error canceling location with id ${id}: ${error}`);
  }
};
