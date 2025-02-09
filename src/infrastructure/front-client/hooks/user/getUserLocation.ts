import axios from "axios";
import { getSession } from "@/lib/session";
import Location from "@/interfaces/location/location";

export default async function getUserLocation(): Promise<Location | null> {
  try {
    const sessionUser = await getSession();
    if (!sessionUser) {
      return null;
    }

    const response = await axios.get(
      `http://localhost:3000/locations/user/${sessionUser.sessionUser.id}`
    );
    if (
      "name" in response.data &&
      response.data.name === "LocationNotFoundError"
    )
      return null;
    return response.data;
  } catch {
    return null;
  }
}
