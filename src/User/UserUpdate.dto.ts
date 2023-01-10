import { PartialType } from '@nestjs/swagger';
import { UserSchema } from './user.model';

export class UserUpdateDto extends PartialType(UserSchema) {}
