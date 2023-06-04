export interface UserDto {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  password?: string;
}
