// export interface IUser {
//   name: string;
//   email: string;
//   password: string;
//   username: string;
//   role: string;
// }

export type TUserRole = 'ADMIN' | 'USER';
export type TUserStatus = 'PENDING' | 'ACTIVE' | 'BLOCK';

export interface IUser {
  name: string;
  email: string;
  username: string;
  title?: string;
  description?: string;
  role: TUserRole;
  avatar?: string;
  password: string;
  status: TUserStatus;
  address?: string;
  phone?: string;
  city?: string;
  country?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}
