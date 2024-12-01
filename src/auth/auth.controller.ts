import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Res,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    this.logger.log('Login attempt');
    this.logger.log(`User object: ${JSON.stringify(req.user)}`);
    const result = await this.authService.login(req.user.data);
    this.logger.log(`Login successful, user: ${req.user.data.email}`);

    response.cookie('jwt', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req) {
    this.logger.log('Logout attempt');
    return req.logout();
  }

  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    this.logger.log(`Profile access attempt, user: ${req.user.email}`);
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('profile2')
  getAdminProfile(@Request() req) {
    this.logger.log(`Admin profile access attempt, user: ${req.user.email}`);
    return req.user;
  }
}
