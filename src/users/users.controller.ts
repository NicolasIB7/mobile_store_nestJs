import { Controller, Get, Body, Request, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUserData(@Request() req) {
    const email = req.user?.email;
    return await this.userService.findOne(email);
  }

  @Put()
  async updateUserData(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    const email = req.user?.email;
    await this.userService.update(email, updateUserDto);
  }
}

//PASOS:


// AGREGAR O IMPLEMENTAR WINSTON.
// SEGUIR CON LAS DEMAS FUNCIONALIDADES Y ENDPOINTS.

// VER TESTING
