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

  @Get('all')
  findAllNoPaginate(): Promise<Fornecedor[]> {
    return this.fornecedorService.findAllNoPaginate();
  }

  @Get(':codFornecedor')
  findByCodFornecedor(@Param('codFornecedor') codFornecedor: number) {
    return this.fornecedorService.findByCodFornecedor(codFornecedor);
  }

  @Post()
  async create(@Body() fornecedor: FornecedorDTO) {
    return await this.fornecedorService.create(fornecedor);
  }

  @Put(':codFornecedor')
  async update(
    @Param('codFornecedor') codFornecedor: number,
    @Body() fornecedor: FornecedorDTO) {
    return this.fornecedorService.update(codFornecedor, fornecedor);
  }

  @Delete(':codFornecedor')
  async delete(
    @Param('codFornecedor') codFornecedor: number) {
    return this.fornecedorService.delete(codFornecedor);
  }
}
