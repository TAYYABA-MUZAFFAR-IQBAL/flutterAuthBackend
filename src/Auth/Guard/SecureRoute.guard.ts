import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/User/user.service';
import { Request } from 'express';

@Injectable()
export class SecureRoute implements CanActivate {
  constructor(private readonly userService: UserService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user.user as any;
    if (user._id === request.params.id) {
      console.log('User is valid to perform this action');

      return true;
    } else {
      console.log('you have only access to your own data');
      return false;
    }
  }
}
