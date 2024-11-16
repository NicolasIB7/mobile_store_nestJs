import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "src/auth/dto/signup-auth-user.dto";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async findOne(username:string):Promise<User | undefined>{
        return this.userRepository.findOne({where:{username}})
        }

    async createUser(signUpDto:SignUpDto):Promise<User | undefined>{
        return this.userRepository.save(signUpDto)
        }
}

// buscar por el id del auth
// actualizar campos
// Borrar campos del perfil
