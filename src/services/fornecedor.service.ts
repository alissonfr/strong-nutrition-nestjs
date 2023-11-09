import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FornecedorDTO } from 'src/dtos/fornecedor.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Fornecedor } from 'src/models/fornecedor.model';
import { FindManyOptions, FindOperator, ILike, Repository } from 'typeorm';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor) private fornecedoresRepository: Repository<Fornecedor>,
  ) { }

  async find(query): Promise<PaginatorInterface<Fornecedor>> {
    const skip = (query.page - 1) * query.pageSize;

    const where: FindManyOptions<Fornecedor>['where'] = {};

    if (query.cnpj) {
      where.cnpj = ILike(`%${query.cnpj}%`);
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

  async findById(idFornecedor: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedoresRepository.findOneBy({ idFornecedor });
    if (!fornecedor) throw new NotFoundException(`Fornecedor com código '${idFornecedor}' não encontrado`);
    return fornecedor
  }

  async create(data: FornecedorDTO): Promise<Fornecedor> {
    const fornecedor = this.fornecedoresRepository.create(data);
    return await this.fornecedoresRepository.save(fornecedor);
  }

  async update(idFornecedor: number, fornecedor: FornecedorDTO): Promise<Fornecedor> {
    const existingFornecedor = await this.findById(idFornecedor)

    Object.assign(existingFornecedor, fornecedor);

    return this.fornecedoresRepository.save(existingFornecedor);
  }

  async delete(idFornecedor: number): Promise<void> {
    const fornecedor = await this.findById(idFornecedor);

    if (!fornecedor) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.fornecedoresRepository.remove(fornecedor);
  }
}
