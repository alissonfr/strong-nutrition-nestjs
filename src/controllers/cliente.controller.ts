import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ClienteDTO } from 'src/dtos/cliente.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Cliente } from 'src/models/cliente.model';
import { ClienteService } from 'src/services/cliente.service';

@Controller('cliente')
@UseGuards(AuthGuard('jwt'))
export class ClienteController {
  constructor(
    private clienteService: ClienteService,
  ) { }

  @Get()
  async find(@Query() query): Promise<PaginatorInterface<Cliente>> {
    return await this.clienteService.find(query);
  }

  @Get(':idCliente')
  async findById(@Param('idCliente') idCliente: number) {
    return await this.clienteService.findById(idCliente);
  }

  @Post()
  async create(@Body() cliente: ClienteDTO) {
    return await this.clienteService.create(cliente);
  }

  @Put(':idCliente')
  async update(
    @Param('idCliente') idCliente: number,
    @Body() cliente: ClienteDTO) {
    return await this.clienteService.update(idCliente, cliente);
  }

  @Delete(':idCliente')
  async delete(
    @Param('idCliente') idCliente: number) {
    return await this.clienteService.delete(idCliente);
  }
}
