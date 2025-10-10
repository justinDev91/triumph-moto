import activateEmail from "@/hooks/email/activateEmail";
import registerUser from "@/hooks/user/registerUser";
import deleteUser from "@/hooks/user/deleteUser";

export default async function signup(formData: FormData): Promise<
  | number
  | {
      name: string;
    }
> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const registerResponse = await registerUser({
    firstName,
    lastName,
    email,
    password,
  });

  if ("email" in registerResponse) {
    const emailResponse = await activateEmail({
      link: `http://localhost:3001/Activate/${registerResponse.id}`,
      name: `${registerResponse.firstname} ${registerResponse.lastname}`,
      userEmail: registerResponse.email,
    });
    if (emailResponse !== 200) {
      await deleteUser(registerResponse.id);
      return {
        name: "Nous n'avons pas pu finaliser votre inscription, votre compte a été supprimé",
      };
    }
    return emailResponse;
  }
  return registerResponse;
}
