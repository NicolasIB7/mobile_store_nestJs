import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async signIn(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);

      if (!user) {
        throw new UnauthorizedException();
      }

      const isValidPassword = await bcrypt.compare(pass, user?.password);

      if (!user || !isValidPassword) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.uuid, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        `Ha ocurrido un error al iniciar sesión: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const hashPassword = await hashPass(signUpDto.password);
    const userToSave = { ...signUpDto, password: hashPassword };

    await this.userService.createUser(userToSave);
  }
}

const hashPass = async (password: string) => {
  const salt: number = 10;
  const hash = await bcrypt.hash(password, salt);

  return hash;
};
