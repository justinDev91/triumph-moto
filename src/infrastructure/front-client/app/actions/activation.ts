import activateUser from "@/hooks/user/activateUser";

export default async function activation(id: string): Promise<number> {
  const activateResponse = await activateUser(id);

  return activateResponse;
}
