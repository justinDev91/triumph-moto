import React from "react";

interface CardLocationProps {
  location: {
    id: string;
    motorcycle: {
      brand: { value: string };
      model: { value: string };
      year: { value: number };
    };
    user: {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
    };
    startDate: { value: string };
    endDate: { value: string };
    status: string;
    cost: number;
  };
}

const CardLocation: React.FC<CardLocationProps> = ({ location }) => {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold mb-2">
        {location.motorcycle.brand.value} {location.motorcycle.model.value} (
        {location.motorcycle.year.value})
      </h2>
      <p className="text-sm text-gray-600">
        Loué par: {location.user.firstName.value} {location.user.lastName.value}{" "}
        ({location.user.email.value})
      </p>
      <p className="text-sm text-gray-600">Statut: {location.status}</p>
      <p className="text-sm text-gray-600">Coût: {location.cost}€</p>
    </div>
  );
};

export default CardLocation;
