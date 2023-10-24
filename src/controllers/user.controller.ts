import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { UserDTO } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';


@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Get()
  find(@Query() query): Promise<PaginatorInterface<User>> {
    return this.userService.find(query);
  }

  @Get(':idUser')
  findById(@Param('idUser') idUser: number) {
    return this.userService.findById(idUser);
  }

  @Post()
  async create(@Body() user: UserDTO) {
    return await this.userService.create(user);
  }

  @Put(':idUser')
  async update(
    @Param('idUser') idUser: number,
    @Body() user: UserDTO) {
    return this.userService.update(idUser, user);
  }

  @Delete(':idUser')
  async delete(
    @Param('idUser') idUser: number) {
    return this.userService.delete(idUser);
  }
}
