export default interface Appointment {
  id: string;
  user: {
    id: string;
    firstName: { value: string };
    lastName: { value: string };
    email: { value: string };
  };
  startTime: Date;
  endTime: Date;
  appointmentStatus: string;
  reason: string;
  company: {
    name: { value: string };
  };
  location?: {
    id: string;
    status: string;
  } | null;
  repair?: {
    id: string;
    description: string;
  } | null;
}
