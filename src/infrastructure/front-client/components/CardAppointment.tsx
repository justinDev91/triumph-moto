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
    repair?: {
      description: string;
    };
    maintenance?: {
      description: string;
    };
    motorcycleTrial?: {
      model: string;
    };
  };
}

const CardAppointment: React.FC<CardAppointmentProps> = ({ appointment }) => {
  console.log("appointment", appointment)
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

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
        Du {formatDate(appointment.startTime)} au {formatDate(appointment.endTime)}
      </p>

      {appointment.reason === "Repair" && appointment.repair && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Réparation :</strong> {appointment.repair.description}
        </div>
      )}

      {appointment.reason === "Maintenance" && appointment.maintenance && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Maintenance :</strong> {appointment.maintenance.description}
        </div>
      )}

      {appointment.reason === "MotorcycleTrial" && appointment.motorcycleTrial && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Essai de moto :</strong> {appointment.motorcycleTrial.model}
        </div>
      )}

    </div>
  );
};

export default CardAppointment;
