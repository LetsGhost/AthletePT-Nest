import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.data.password);

    if (!isMatch) {
      return null;
    }

    return user;
  }

  async login(user) {
    const payload = { email: user.data.email, sub: user.data._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
