import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { UserRole } from './Role.enum';
export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema {
  @ApiProperty({
    description: 'Name of the user',
    required: false,
    nullable: true,
  })
  @Prop()
  user_name: string;

  @ApiProperty({
    description: 'email of user must be unique',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'password.',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: 'role of user',
    enum: UserRole,
    type: 'enum',
    default: UserRole.User,
  })
  @Prop({ required: true })
  role: UserRole;

  @Prop({ nullable: true })
  refresh_token: string;

   @Transform(({ value }) => value.toString())
  _id: string;
}

export const UserModel = SchemaFactory.createForClass(UserSchema);
