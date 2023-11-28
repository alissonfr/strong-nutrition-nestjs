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
  async find(@Query() query): Promise<PaginatorInterface<Fornecedor>> {
    return await this.fornecedorService.find(query);
  }

  @Get(':idFornecedor')
  async findById(@Param('idFornecedor') idFornecedor: number) {
    return await this.fornecedorService.findById(idFornecedor);
  }

  @Post()
  async create(@Body() fornecedor: FornecedorDTO) {
    return await this.fornecedorService.create(fornecedor);
  }

  @Put(':idFornecedor')
  async update(
    @Param('idFornecedor') idFornecedor: number,
    @Body() fornecedor: FornecedorDTO) {
    return await this.fornecedorService.update(idFornecedor, fornecedor);
  }

  @Delete(':idFornecedor')
  async delete(
    @Param('idFornecedor') idFornecedor: number) {
    return await this.fornecedorService.delete(idFornecedor);
  }
}
