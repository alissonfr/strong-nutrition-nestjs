import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Produto } from 'src/models/produto.model';
import { ProdutoDTO } from 'src/dtos/produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private produtoRepository: Repository<Produto>,
  ) { }

  async find(query): Promise<PaginatorInterface<Produto>> {
    const skip = (query.page - 1) * query.pageSize;

    const where: FindManyOptions<Produto>['where'] = {};

    if (query.nome) {
      where.nome = ILike(`%${query.nome}%`);
    }

    if (query.marca) {
      where.marca = ILike(`%${query.marca}%`);
    }

    const [produtos, total] = await this.produtoRepository.findAndCount({
      where,
      take: query.pageSize,
      skip,
      relations: ['fornecedor']
    });

    return { content: produtos, total };
  }

  async findById(idProduto: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        idProduto,
      },
      relations: ['fornecedor'],
    });
    if (!produto) throw new NotFoundException(`Produto com ID '${idProduto}' não encontrado`);
    return produto
  }

  async create(data: ProdutoDTO): Promise<Produto> {
    const produto = this.produtoRepository.create(data);
    return await this.produtoRepository.save(produto);
  }

  async update(idProduto: number, produto: ProdutoDTO): Promise<Produto> {
    const existingProduto = await this.findById(idProduto)

    Object.assign(existingProduto, produto);

    return this.produtoRepository.save(existingProduto);
  }

  async delete(idProduto: number): Promise<void> {
    const produto = await this.findById(idProduto);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.produtoRepository.remove(produto);
  }
}
