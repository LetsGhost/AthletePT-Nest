import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    this.logger.log(`Validating user: ${email}`);
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`User not found: ${email}`);
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.data.password);

    if (!isMatch) {
      this.logger.warn(`Invalid password for user: ${email}`);
      return null;
    }

    this.logger.log(`User validated: ${email}`);
    return user;
  }

  async login(user) {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    this.logger.log(
      `Generating JWT for user: ${user.email} ` + JSON.stringify(payload),
    );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      this.jwtService.verify(token);
      this.logger.log('JWT token verified ' + token);
      return true;
    } catch (e) {
      this.logger.warn('Invalid JWT token ' + e);
      return false;
    }
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
      this.logger.log('JWT token decoded ' + this.jwtService.decode(token));
    } catch (e) {
      this.logger.warn('Failed to decode JWT token' + e);
      return null;
    }
  }
}
