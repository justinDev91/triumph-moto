"use client";

import { FormEvent } from "react";
import Motorcycle from "@/interfaces/motorcycle/motorcycle";
import { handleLocationSubmit } from "@/app/actions/location";

interface LocationFormProps {
  availableMotorcycles: Motorcycle[];
}

export default function LocationForm({
  availableMotorcycles,
}: LocationFormProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleLocationSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Date de début
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          Date de fin
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="motorcycle"
          className="block text-sm font-medium text-gray-700"
        >
          Sélectionnez une moto
        </label>
        <select
          id="motorcycle"
          name="motorcycle"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          {availableMotorcycles.map((moto) => (
            <option key={moto.id} value={moto.id}>
              {moto.brand.value} {moto.model.value} ({moto.year.value})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Louer
      </button>
    </form>
  );
}
