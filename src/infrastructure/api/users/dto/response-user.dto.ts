export class ResponseUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  administrator: boolean;
  createdAt: Date;
  updatedAt: Date;
}
