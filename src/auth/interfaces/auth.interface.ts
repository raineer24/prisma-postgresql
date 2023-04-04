export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  image_id?: string;
  image_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
