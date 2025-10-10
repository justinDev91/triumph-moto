export default function getError(name: string): string {
  let errorMessage;

  switch (name) {
    case "PasswordTooShortError":
      errorMessage = "Le mot de passe est trop court.";
      break;
    default:
      errorMessage = "Une erreur inattendue est survenue.";
  }

  return errorMessage;
}
