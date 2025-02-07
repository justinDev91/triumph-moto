// import getUser from "@/hooks/user/getUser";

export default async function login(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email);
  console.log(password);
}
