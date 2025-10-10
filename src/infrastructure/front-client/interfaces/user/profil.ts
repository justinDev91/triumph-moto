export default interface Profil {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isActive: boolean | null;
  administrator: boolean;
  createdAt: Date;
  updatedAt: Date;
}
