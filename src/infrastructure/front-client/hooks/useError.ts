export default function useError(name: string): string {
  let errorMessage = 'Une erreur est survenue.';

  switch (name) {
    case 'PasswordTooShortError':
      errorMessage = 'Le mot de passe est trop court.';
      break;
    default:
      errorMessage = 'Une erreur inattendue est survenue.';
  }

  return errorMessage;
}
