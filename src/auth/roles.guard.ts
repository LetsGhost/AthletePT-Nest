import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ROLES_KEY } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['jwt'];

    if (!token) {
      this.logger.warn('No JWT token found in cookies');
      throw new UnauthorizedException('No JWT token found in cookies');
    }

    const user = await this.authService.decodeToken(token);
    if (!user) {
      this.logger.warn('Invalid JWT token');
      throw new UnauthorizedException('Invalid JWT token');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      this.logger.warn(
        `User role ${user.role} does not have required roles: ${requiredRoles}`,
      );
    } else {
      this.logger.log(
        `User role ${user.role} matches one of the required roles: ${requiredRoles}`,
      );
    }

    return hasRole;
  }
}
