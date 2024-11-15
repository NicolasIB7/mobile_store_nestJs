import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);

    const isValidPassword = await bcrypt.compare(pass, user?.password);

    if (!user || !isValidPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.uuid, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
