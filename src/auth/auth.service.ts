import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signup-auth-user.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    try {
      const user = await this.userService.findOne(email);

      if (!user) {
        this.logger.error(`Error al iniciar sesión de ${email}`);
        throw new UnauthorizedException();
      }

      const isValidPassword = await bcrypt.compare(pass, user?.password);

      if (!user || !isValidPassword) {
        this.logger.error(
          `No se encontró el usuario o la contraseña es inválida de ${email}`,
        );
        throw new UnauthorizedException();
      }
      const payload = { sub: user.uuid, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      this.logger.error('Ha ocurrido un error al iniciar sesión:', error);
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
    this.logger.info(`El usuario con email ${signUpDto.email} se creó correctamente`);
  }
}

const hashPass = async (password: string) => {
  try {
    const salt: number = 10;
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    throw new HttpException(
      `Ha ocurrido un error al hashear la contraseña: ${error.message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
