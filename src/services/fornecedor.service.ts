import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FornecedorDTO } from 'src/dtos/fornecedor.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Fornecedor } from 'src/models/fornecedor.model';
import { FindOperator, ILike, Repository } from 'typeorm';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor) private fornecedoresRepository: Repository<Fornecedor>,
  ) { }

  async find(query): Promise<PaginatorInterface<Fornecedor>> {
    const skip = (query.page - 1) * query.pageSize;

    const where: {
      razaoSocial?: string | FindOperator<string>;
      nomeFantasia?: string | FindOperator<string>;
    } = {};

    if (query.razaoSocial) {
      where.razaoSocial = ILike(`%${query.razaoSocial}%`);
    }

    if (query.nomeFantasia) {
      where.nomeFantasia = ILike(`%${query.nomeFantasia}%`);
    }

    const [fornecedores, total] = await this.fornecedoresRepository.findAndCount({
      where,
      take: query.pageSize,
      skip,
    });

    return { content: fornecedores, total };
  }

  async findAllNoPaginate(): Promise<Fornecedor[]> {
    return await this.fornecedoresRepository.find();
  }

  async findByCodFornecedor(codFornecedor: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedoresRepository.findOneBy({ codFornecedor });
    if (!fornecedor) throw new NotFoundException(`Fornecedor com código '${codFornecedor}' não encontrado`);
    return fornecedor
  }

  async findByRazaoSocial(razaoSocial: string): Promise<Fornecedor> {
    const fornecedor = await this.fornecedoresRepository.findOneBy({ razaoSocial });
    if (!fornecedor) throw new NotFoundException(`Fornecedor de razão social:'${razaoSocial}'. não encontrado`);
    return fornecedor;
  }

  async create(data: FornecedorDTO): Promise<Fornecedor> {
    const fornecedor = this.fornecedoresRepository.create(data);
    return await this.fornecedoresRepository.save(fornecedor);
  }

  async update(codFornecedor: number, fornecedor: FornecedorDTO): Promise<Fornecedor> {
    const existingFornecedor = await this.findByCodFornecedor(codFornecedor)

    Object.assign(existingFornecedor, fornecedor);

    return this.fornecedoresRepository.save(existingFornecedor);
  }

  async delete(codFornecedor: number): Promise<void> {
    const fornecedor = await this.findByCodFornecedor(codFornecedor);

    if (!fornecedor) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.fornecedoresRepository.remove(fornecedor);
  }
}
