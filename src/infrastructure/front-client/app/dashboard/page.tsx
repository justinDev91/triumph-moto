"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "@/lib/session";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";

interface Appointment {
  id: string;
  reason: string;
  startTime: string;
  appointmentStatus: string;
  user: {
    id: string;
  };
}

interface Location {
  id: string;
  user: {
    id: string;
  } | null;
}

interface Stat {
  name: string;
  stat: string | number;
}

interface ChartData {
  date: string;
  appointments: number;
}

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      const sessionData = await getSession();
      if (isMounted && sessionData === null) {
        router.push("/Sign/In");
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const [stats, setStats] = useState<Stat[]>([
    { name: "Total Appointments", stat: "0" },
    { name: "Total Locations", stat: "0" },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const sessionUser = await getSession();
        if (!sessionUser) return;

        const appointmentsResponse = await axios.get<Appointment[]>(
          "http://localhost:3000/appointments"
        );
        const locationsResponse = await axios.get<Location[]>(
          "http://localhost:3000/locations"
        );

        const userAppointments = appointmentsResponse.data.filter(
          (appointment) => appointment.user.id === sessionUser.sessionUser.id
        );

        const userLocations = locationsResponse.data.filter(
          (location) =>
            location.user && location.user.id === sessionUser.sessionUser.id
        );

        const chartData = userAppointments.map((appointment) => ({
          date: new Date(appointment.startTime).toLocaleDateString(),
          appointments: 1,
        }));

        setStats([
          { name: "Total Appointments", stat: userAppointments.length },
          { name: "Total Locations", stat: userLocations.length },
        ]);
        setAppointments(userAppointments.slice(0, 5));
        setChartData(chartData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des statistiques:",
          error
        );
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-base font-semibold text-gray-900">Statistiques</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900">
          Évolution des Rendez-vous
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#4F46E5"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900">
          Vos derniers rendez-vous
        </h3>
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="py-4">
              <p className="text-sm font-medium text-gray-900">
                {appointment.reason}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(appointment.startTime).toLocaleDateString()} -{" "}
                {appointment.appointmentStatus}
              </p>
            </li>
          ))}
          {appointments.length === 0 && (
            <p className="text-sm text-gray-500">Aucun rendez-vous trouvé.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
