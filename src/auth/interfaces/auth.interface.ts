export interface IUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  role: string;
  image_id?: string;
  image_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
