import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-auth-user.dto';

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

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const hashPassword = await hashPass(signUpDto.password);
    const userToSave = { ...signUpDto, password: hashPassword };

    await this.userService.createUser(userToSave);
  }
}

const hashPass = async (password) => {
  const salt = 10;
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
