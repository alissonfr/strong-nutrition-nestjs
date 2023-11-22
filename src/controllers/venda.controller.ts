import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { VendaService } from 'src/services/venda.service';

import { Venda } from './../models/venda.model';

@Controller('venda')
//@UseGuards(AuthGuard('jwt'))
export class VendaController {
  constructor(
    private vendaService: VendaService,
  ) { }

  @Get()
  find(@Query() query): Promise<PaginatorInterface<Venda>> {
    return this.vendaService.find(query);
  }

  @Get(':idVenda')
  findById(@Param('idVenda') idVenda: number) {
    return this.vendaService.findById(idVenda);
  }

  @Post()
  async create(@Body() venda: Partial<Venda>) {
    return await this.vendaService.create(venda);
  }

  @Put(':idVenda')
  async update(
    @Param('idVenda') idVenda: number,
    @Body() venda: Partial<Venda>) {
    return this.vendaService.update(idVenda, venda);
  }

  @Delete(':idVenda')
  async delete(
    @Param('idVenda') idVenda: number) {
    return this.vendaService.delete(idVenda);
  }
}
