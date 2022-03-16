export interface IUserResponseDto {
  id?: string;
  avatarUrl: string;
  email: string;
  name: string;
  driverLicense: string;
  userAvatarUrl(): string | null;
}
