export default function comparePassword(
  formPassword: string,
  dataPassword: string
): boolean {
  return formPassword === dataPassword;
}
