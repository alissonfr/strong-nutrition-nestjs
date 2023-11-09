import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { FornecedorDTO } from 'src/dtos/fornecedor.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Fornecedor } from 'src/models/fornecedor.model';
import { FornecedorService } from 'src/services/fornecedor.service';

@Controller('fornecedor')
@UseGuards(AuthGuard('jwt'))
export class FornecedorController {
  constructor(
    private fornecedorService: FornecedorService,
  ) { }

  @Get()
  find(@Query() query): Promise<PaginatorInterface<Fornecedor>> {
    return this.fornecedorService.find(query);
  }

  @Get(':idFornecedor')
  findById(@Param('idFornecedor') idFornecedor: number) {
    return this.fornecedorService.findById(idFornecedor);
  }

  @Post()
  async create(@Body() fornecedor: FornecedorDTO) {
    return await this.fornecedorService.create(fornecedor);
  }

  @Put(':idFornecedor')
  async update(
    @Param('idFornecedor') idFornecedor: number,
    @Body() fornecedor: FornecedorDTO) {
    return this.fornecedorService.update(idFornecedor, fornecedor);
  }

  @Delete(':idFornecedor')
  async delete(
    @Param('idFornecedor') idFornecedor: number) {
    return this.fornecedorService.delete(idFornecedor);
  }
}
