import { Controller, Get, Body, Request, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { Roles } from './decorator/rol.decorator';
import { Role } from './entities/rol.enum';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @Roles(Role.Admin)
  async getUserData(@Request() req) {
    const email = req.user?.email;
    const userData=await this.userService.findOne(email);
    const {password, createdAt, updatedAt, roles, ...userResponse } = userData
    return userResponse
  }

  @Put()
  async updateUserData(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    const email = req.user?.email;
    await this.userService.update(email, updateUserDto);
  }
}


