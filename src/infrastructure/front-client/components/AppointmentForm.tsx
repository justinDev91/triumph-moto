"use client";

import { FormEvent, useEffect, useState } from "react";
import { handleAppointmentSubmit } from "@/app/actions/appointment";
import axios from "axios";

export default function AppointmentForm() {
  const [companies, setCompanies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const companiesRes = await axios.get("http://localhost:3000/companies");
      const locationsRes = await axios.get("http://localhost:3000/locations");
      const repairsRes = await axios.get("http://localhost:3000/repairs");

      setCompanies(companiesRes.data);
      setLocations(locationsRes.data);
      setRepairs(repairsRes.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleAppointmentSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <input
          type="text"
          id="reason"
          name="reason"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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

      <div>
        <label
          htmlFor="locationId"
          className="block text-sm font-medium text-gray-700"
        >
          Sélectionnez un emplacement
        </label>
        <select
          id="locationId"
          name="locationId"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.status}
            </option>
          ))}
        </select>
      </div>

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
              {repair.description}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Créer un rendez-vous
      </button>
    </form>
  );
}
