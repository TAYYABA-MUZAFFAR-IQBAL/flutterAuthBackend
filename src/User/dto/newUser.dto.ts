import { UserRole } from '../Role.enum';

export class NewUserDTO {
  user_name: string;
  email: string;
  password: string;
  role: UserRole;
}
