import { HttpException, Injectable, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/signup-auth-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    try {
      const findUser=this.userRepository.findOne({ where: { email } });
      this.logger.info(`Usuario con email ${email} encontrado correctamente`);
      return findUser
    } catch (error) {
      this.logger.error(`Error al encontrar el usuario ${email}`, error);
      throw new HttpException(
        'Error al encontrar el usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createUser(signUpDto: SignUpDto): Promise<void> {
    try {
      const emailExist = await this.userRepository.findOne({
        where: { email: signUpDto.email },
      });

      if (emailExist) {
        this.logger.error(`EL email ${signUpDto.email} ya existe en la BDD.`);
        throw new HttpException('El email ya existe', HttpStatus.CONFLICT);
      }

      await this.userRepository.save(signUpDto);
      this.logger.info(`Usuario con email ${signUpDto.email} creado correctamente`);
    } catch (error) {
      if (error instanceof HttpException) {
        this.logger.error('Error', error);
        throw error;
      }
      this.logger.error(
        `Error al crear el usuario con email ${signUpDto.email}: ${error.message}`
      );
      throw new HttpException(
        `Error al crear el usuario: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(email: string, updateUserDto: UpdateUserDto): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        this.logger.error(`Usuario no encontrado con el email: ${email}`);
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }

      await this.userRepository.update({ email }, updateUserDto);

      this.logger.info(`Usuario con email ${email} actualizado correctamente`);
    } catch (error) {
      this.logger.error(
        `Error al actualizar datos del usuario con email ${email}: ${error.message}`
      );

      throw new HttpException(
        'Error al actualizar información del perfil',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
