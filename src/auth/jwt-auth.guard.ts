import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No JWT token found in cookies');
    }

    const isValid = await this.authService.verifyToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
