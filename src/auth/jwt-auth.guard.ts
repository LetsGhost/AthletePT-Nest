import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];

    if (!token) {
      this.logger.warn('No JWT token found in cookies');
      throw new UnauthorizedException('No JWT token found in cookies');
    }

    const isValid = await this.authService.verifyToken(token);
    if (!isValid) {
      this.logger.warn('Invalid JWT token');
      throw new UnauthorizedException('Invalid JWT token');
    }

    const user = await this.authService.decodeToken(token);
    if (!user) {
      this.logger.warn('Failed to decode JWT token');
      throw new UnauthorizedException('Failed to decode JWT token');
    }

    request.user = user;

    return super.canActivate(context) as Promise<boolean>;
  }
}
