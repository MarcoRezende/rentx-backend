export interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driverLicense: string;
  avatarUrl?: string;
  id?: string;
}
