import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { UserDTO } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get()
  find(): Promise<User[]> {
    return this.userService.find();
  }

  @Get(':idUser')
  findById(@Param('idUser') idUser: number) {
    return this.userService.findById(idUser);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post()
  async create(@Body() user: UserDTO) {
    return await this.userService.create(user);
  }

  @Put(':idUser')
  async update(
    @Param('idUser') idUser: number,
    @Body() user: User) {
    return this.userService.update(idUser, user);
  }
}
