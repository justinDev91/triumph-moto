import React from "react";
import { Appointment } from "@/app/shared/models/appointment.model";

interface CardAppointmentProps {
  appointment: Appointment;
}

const CardAppointment: React.FC<CardAppointmentProps> = ({ appointment }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">{appointment.reason}</h2>
      <p className="text-sm text-gray-600">
        Entreprise : {appointment.company?.name?.value || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        Utilisateur : {appointment.user?.firstName?.value}{" "}
        {appointment.user?.lastName?.value} ({appointment.user?.email?.value})
      </p>
      <p className="text-sm text-gray-600">
        Statut : {appointment.appointmentStatus}
      </p>
      <p className="text-sm text-gray-600">
        Du {formatDate(appointment.startTime)} au {formatDate(appointment.endTime)}
      </p>

      {appointment.reason === "Repair" && appointment.repair && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Réparation :</strong>
          <ul>
            {appointment.repair.actions?.map((action, index) => (
              <li key={index}>{action}</li>
            )) || "Aucune action de réparation"}
          </ul>
        </div>
      )}

      {appointment.reason === "Maintenance" && appointment.maintenance && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Maintenance :</strong> {appointment.maintenance.maintenanceType}
        </div>
      )}

      {appointment.reason === "MotorcycleTrial" && appointment.motorcycleTrial && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Essai de moto :</strong>{" "}
          {appointment.motorcycleTrial.motorcycle?.brand?.value || "Marque non disponible"}
        </div>
      )}

      {appointment.reason === "Location" && appointment.location && (
        <div className="mt-2 text-sm text-gray-600">
          <strong>Location de moto :</strong>{" "}
          {appointment.location.motorcycle?.model?.value || "Modèle non disponible"}
        </div>
      )}
    </div>
  );
};

export default CardAppointment;
