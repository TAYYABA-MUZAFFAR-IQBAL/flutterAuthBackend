import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../User/user.service';

@Injectable()
export class refreshTokenGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isCorrect: boolean = await this.userService.compareRefreshToken(
      request.user.user.id,
      request.user.refreshToken,
    );

    if (isCorrect) {
      return true;
    }
    return false;
  }
}
