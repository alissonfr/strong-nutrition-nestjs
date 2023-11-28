import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { VendaProduto } from 'src/models/venda-produto.model';
import { Venda } from 'src/models/venda.model';
import { FindManyOptions, ILike, Repository } from 'typeorm';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda) private vendaRepository: Repository<Venda>,
    @InjectRepository(VendaProduto) private vendaProdutoRepository: Repository<VendaProduto>,
  ) { }

  async find(query): Promise<PaginatorInterface<Venda>> {
    if (!query.page && !query.pageSize) {
      query.page = 1;
      query.pageSize = 9999;
    }

    const skip = (query.page - 1) * query.pageSize;

    const where: FindManyOptions<Venda>['where'] = {};

    if (query.observacao) {
      where.observacao = ILike(`%${query.observacao}%`);
    }

    const [vendas, total] = await this.vendaRepository.findAndCount({
      where,
      take: query.pageSize,
      skip
    });

    return { content: vendas, total };
  }

  async findById(idVenda: number): Promise<Venda> {
    const venda = await this.vendaRepository.findOne({
      where: {
        idVenda
      }
    });
    if (!venda) throw new NotFoundException(`Venda com ID '${idVenda}' não encontrada`);
    return venda
  }

  async findByIdCliente(idCliente: number): Promise<Venda[]> {
    return this.vendaRepository
      .createQueryBuilder('venda')
      .where('venda.cliente.idCliente = :idCliente', { idCliente })
      .getMany();
  }

  async findByIdUser(idUser: number): Promise<Venda[]> {
    return this.vendaRepository
      .createQueryBuilder('venda')
      .where('venda.funcionario.idUser = :idUser', { idUser })
      .getMany();
  }

  async create(data: Partial<Venda>): Promise<Venda> {
    const venda = this.vendaRepository.create(data);
    return await this.vendaRepository.save(venda);
  }

  async update(idVenda: number, venda: Partial<Venda>): Promise<Venda> {
    const existingVenda = await this.findById(idVenda)

    Object.assign(existingVenda, venda);

    return this.vendaRepository.save(existingVenda);
  }

  async delete(idVenda: number): Promise<void> {
    const venda = await this.findById(idVenda);

    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }

    if (venda.vendaProdutos && venda.vendaProdutos.length > 0) {
      venda.vendaProdutos.forEach(async (vendaProduto) => {
        await this.vendaProdutoRepository.remove(vendaProduto);
      })
    }

    await this.vendaRepository.remove(venda);
  }
}
