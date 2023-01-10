import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema, UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: UserSchema.name, schema: UserModel }]),
  ],
  exports: [UserService],
})
export class UserModule {}
