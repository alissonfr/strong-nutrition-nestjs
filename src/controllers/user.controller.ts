import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { UserDTO } from '../dtos/user.dto';


@Controller('user')
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

  @Post()
  async create(@Body() body: UserDTO) {
    return await this.userService.create(body);
  }

  @Put(':idUser')
  async update(
    @Param('idUser') idUser: number,
    @Body() user: User) {
    return this.userService.update(idUser, user);
  }
}
