import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from 'src/auth/dto/signup-auth-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>) { }

    async findOne(email: string): Promise<User | undefined> {
        try {
            return this.userRepository.findOne({ where: { email } });

        } catch (error) {
            throw new HttpException('Error al encontrar el usuario', HttpStatus.BAD_REQUEST);
        }

    }

    async createUser(signUpDto: SignUpDto): Promise<User | undefined> {
        try {
            const emailExist = this.userRepository.findOne({ where: { email: signUpDto.email } });
            if (emailExist) {
                throw new HttpException('El email ya existe', HttpStatus.CONFLICT);
            }

            return this.userRepository.save(signUpDto);
        } catch (error) {
            throw new HttpException('Error al crear el usuario', HttpStatus.BAD_REQUEST);
        }

    }

    async update(email: string, updateUserDto: UpdateUserDto): Promise<void> {
        try {
            await this.userRepository.update({ email }, updateUserDto);
        } catch (error) {
            throw new HttpException('Error al actualizar información del perfil', HttpStatus.BAD_REQUEST);
        }

    }
}
