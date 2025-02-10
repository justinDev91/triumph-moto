
import axios from 'axios';
import { CreateAppointmentDto } from './dto/create-appointment.tdo';
import { Appointment } from '@/app/shared/models/appointment.model';
import { UpdateAppointmentDto } from './dto/update-appointment.tdo';

const BASE_URL = 'http://localhost:3000/appointments';

export const createAppointment = async (
  createAppointmentDto: CreateAppointmentDto
): Promise<Appointment | Error> => {
  try {
    const response = await axios.post(`${BASE_URL}`, createAppointmentDto);
    return response.data;
  } catch (error) {
    return new Error(`Error creating appointment: ${error}`);
  }
};

export const getAllAppointments = async (): Promise<Appointment[] | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching appointments: ${error}`);
  }
};

export const getAppointmentById = async (
  id: string
): Promise<Appointment | Error> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    return new Error(`Error fetching appointment with ID ${id}: ${error}`);
  }
};

export const updateAppointment = async (
  id: string,
  updateAppointmentDto: UpdateAppointmentDto
): Promise<Appointment | Error> => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updateAppointmentDto);
    return response.data;
  } catch (error) {
    return new Error(`Error updating appointment with ID ${id}: ${error}`);
  }
};

export const cancelAppointment = async (
  id: string
): Promise<void | Error> => {
  try {
    await axios.post(`${BASE_URL}/${id}/cancel`);
  } catch (error) {
    return new Error(`Error cancelling appointment with ID ${id}: ${error}`);
  }
};
