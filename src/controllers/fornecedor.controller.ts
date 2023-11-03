import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { UserDTO } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { FornecedorService } from 'src/services/fornecedor.service';
import { Fornecedor } from 'src/models/fornecedor.model';
import { FornecedorDTO } from 'src/dtos/fornecedor.dto';


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
