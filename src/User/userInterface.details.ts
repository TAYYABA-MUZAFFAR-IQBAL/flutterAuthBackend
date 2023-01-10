import { UserRole } from './Role.enum';

export interface UserDetails {
  _id: string;
  user_name: string;
  email: string;
  role: UserRole;
}
