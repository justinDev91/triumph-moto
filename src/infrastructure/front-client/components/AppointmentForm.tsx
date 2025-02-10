"use client";

import { FormEvent, useEffect, useState } from "react";
import { handleAppointmentSubmit } from "@/app/actions/appointment";
import { Company } from "@/app/shared/models/company.model";
import { Repair } from "@/app/shared/models/repair.model";
import { Maintenance } from "@/app/shared/models/maintenance.model";
import { MotorcycleTrial } from "@/app/shared/models/motorcycle-trial.model";
import { getAllCompanies } from "@/hooks/company/company.service";
import { getAllRepairs } from "@/hooks/repair/repair.service";
import getUser from "@/hooks/user/getUser";
import Profil from "@/interfaces/user/profil";
import { getAllMaintenanceRecords } from "@/hooks/maintenance/maintenance.service";
import { getAllMotorcycleTrials } from "@/hooks/motorcycleTrial/motorcycle.trial.service";
import { useRouter } from "next/navigation";

export default function AppointmentForm() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [motorcycleTrials, setMotorcycleTrials] = useState<MotorcycleTrial[]>([]);
  const [user, setUser] = useState<Profil | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reason, setReason] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await getAllCompanies();
        if (companiesData instanceof Error) {
          setError("Failed to load companies.");
        } else {
          setCompanies(companiesData);
        }

        const repairsData = await getAllRepairs();
        if (repairsData instanceof Error) {
          setError("Failed to load repairs.");
        } else {
          setRepairs(repairsData);
        }

        const maintenancesData = await getAllMaintenanceRecords();
        if (maintenancesData instanceof Error) {
          setError("Failed to load maintenances.");
        } else {
          setMaintenances(maintenancesData);
        }

        const motorcycleTrialsData = await getAllMotorcycleTrials();
        if (motorcycleTrialsData instanceof Error) {
          setError("Failed to load motorcycle trials.");
        } else {
          setMotorcycleTrials(motorcycleTrialsData);
        }

        const userData = await getUser();
        if (userData instanceof Error) {
          setError("Failed to load user data.");
        } else {
          setUser(userData);
        }
      } catch (error) {
        setError(`An unexpected error occurred. ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const appointmentData = {
      userId: user?.id,
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      reason: reason,  
      companyId: formData.get("companyId"),
      repairId: formData.get("repairId"),
      maintenanceId: formData.get("maintenanceId"),
      motorcycleTrialId: formData.get("motorcycleTrialId"),
    };

    await handleAppointmentSubmit(appointmentData);
    router.push("/dashboard"); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}  

      <div>
        <label
          htmlFor="startTime"
          className="block text-sm font-medium text-gray-700"
        >
          Date de début
        </label>
        <input
          type="datetime-local"
          id="startTime"
          name="startTime"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="endTime"
          className="block text-sm font-medium text-gray-700"
        >
          Date de fin
        </label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="reason"
          className="block text-sm font-medium text-gray-700"
        >
          Raison du rendez-vous
        </label>
        <select
          id="reason"
          name="reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Location">Location</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Repair">Repair</option>
          <option value="MotorcycleTrial">MotorcycleTrial</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="companyId"
          className="block text-sm font-medium text-gray-700"
        >
          Sélectionnez une entreprise
        </label>
        <select
          id="companyId"
          name="companyId"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name.value}
            </option>
          ))}
        </select>
      </div>

      {reason === "Repair" && (
        <div>
          <label
            htmlFor="repairId"
            className="block text-sm font-medium text-gray-700"
          >
            Sélectionnez une réparation
          </label>
          <select
            id="repairId"
            name="repairId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Aucune réparation</option>
            {repairs.map((repair) => (
              <option key={repair.id} value={repair.id}>
                {repair.id}
              </option>
            ))}
          </select>
        </div>
      )}

      {reason === "Maintenance" && (
        <div>
          <label
            htmlFor="maintenanceId"
            className="block text-sm font-medium text-gray-700"
          >
            Sélectionnez une maintenance
          </label>
          <select
            id="maintenanceId"
            name="maintenanceId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Aucune maintenance</option>
            {maintenances.map((maintenance) => (
              <option key={maintenance.id} value={maintenance.id}>
                {maintenance?.concession?.name.value}
              </option>
            ))}
          </select>
        </div>
      )}

      {reason === "MotorcycleTrial" && (
        <div>
          <label
            htmlFor="motorcycleTrialId"
            className="block text-sm font-medium text-gray-700"
          >
            Sélectionnez un essai de moto
          </label>
          <select
            id="motorcycleTrialId"
            name="motorcycleTrialId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Aucun essai de moto</option>
            {motorcycleTrials.map((trial) => (
              <option key={trial.id} value={trial.id}>
                {trial.id}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Créer un rendez-vous
      </button>
    </form>
  );
}
