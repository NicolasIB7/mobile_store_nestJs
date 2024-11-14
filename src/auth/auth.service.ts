import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";
import { UserService } from "src/users/user.service";
import {JwtService} from '@nestjs/jwt'


@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(username:string, pass:string):Promise<any>{
        const user = await this.userService.findOne(username);

        if(user?.password !=pass){
            throw new UnauthorizedException();
        }
        const payload = { sub: user.uuid, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };

        // Verificar con jwt, ademas agregarle bycript para hashear la contraseña.

    }
}