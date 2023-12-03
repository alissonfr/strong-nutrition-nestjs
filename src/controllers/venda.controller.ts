import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { VendaService } from 'src/services/venda.service';
import { AuthGuard } from '@nestjs/passport';
import { Venda } from './../models/venda.model';

@Controller('venda')
@UseGuards(AuthGuard('jwt'))
export class VendaController {
  constructor(
    private vendaService: VendaService,
  ) { }

  @Get()
  async find(@Query() query): Promise<PaginatorInterface<Venda>> {
    return await this.vendaService.find(query);
  }

  @Get(':idVenda')
  async findById(@Param('idVenda') idVenda: number) {
    return await this.vendaService.findById(idVenda);
  }

  @Post()
  async create(@Body() venda: Partial<Venda>) {
    return await this.vendaService.create(venda);
  }

  @Put(':idVenda')
  async update(
    @Param('idVenda') idVenda: number,
    @Body() venda: Partial<Venda>) {
    return await this.vendaService.update(idVenda, venda);
  }

  @Delete(':idVenda')
  async delete(
    @Param('idVenda') idVenda: number) {
    return await this.vendaService.delete(idVenda);
  }
}
