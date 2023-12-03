import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ProdutoDTO } from 'src/dtos/produto.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Produto } from 'src/models/produto.model';
import { ProdutoService } from 'src/services/produto.service';

@Controller('produto')
@UseGuards(AuthGuard('jwt'))
export class ProdutoController {
  constructor(
    private produtoService: ProdutoService,
  ) { }

  @Get()
  async find(@Query() query): Promise<PaginatorInterface<Produto>> {
    return await this.produtoService.find(query);
  }

  @Get(':idProduto')
  async findById(@Param('idProduto') idProduto: number) {
    return await this.produtoService.findById(idProduto);
  }

  @Post()
  async create(@Body() produto: ProdutoDTO) {
    return await this.produtoService.create(produto);
  }

  @Put(':idProduto')
  async update(
    @Param('idProduto') idProduto: number,
    @Body() produto: ProdutoDTO) {
    return await this.produtoService.update(idProduto, produto);
  }

  @Delete(':idProduto')
  async delete(@Param('idProduto') idProduto: number) {
    try {
      await this.produtoService.delete(idProduto);
      return { message: 'Produto apagado com sucesso!' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof NotFoundException) {
        throw new HttpException({ message: error.message, statusCode: 404 }, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException({ message: 'Erro interno do servidor', statusCode: 500 }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
