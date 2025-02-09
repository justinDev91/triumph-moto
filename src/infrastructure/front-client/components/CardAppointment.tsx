import React from "react";

interface CardAppointmentProps {
  appointment: {
    id: string;
    user: {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
    };
    startTime: string;
    endTime: string;
    appointmentStatus: string;
    reason: string;
    company: {
      name: { value: string };
    };
  };
}

const CardAppointment: React.FC<CardAppointmentProps> = ({ appointment }) => {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{appointment.reason}</h2>
      <p className="text-sm text-gray-600">
        Entreprise : {appointment.company.name.value}
      </p>
      <p className="text-sm text-gray-600">
        Utilisateur : {appointment.user.firstName.value}{" "}
        {appointment.user.lastName.value} ({appointment.user.email.value})
      </p>
      <p className="text-sm text-gray-600">
        Statut : {appointment.appointmentStatus}
      </p>
      <p className="text-sm text-gray-600">
        Du {new Date(appointment.startTime).toLocaleString()} au{" "}
        {new Date(appointment.endTime).toLocaleString()}
      </p>
    </div>
  );
};

export default CardAppointment;
