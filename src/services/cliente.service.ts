import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClienteDTO } from 'src/dtos/cliente.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';
import { Cliente } from 'src/models/cliente.model';
import { FindManyOptions, ILike, Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private clientesRepository: Repository<Cliente>,
  ) { }

  async find(query): Promise<PaginatorInterface<Cliente>> {
    if (!query.page && !query.pageSize) {
      query.page = 1;
      query.pageSize = 9999;
    }

    const skip = (query.page - 1) * query.pageSize;

    const where: FindManyOptions<Cliente>['where'] = {};

    if (query.nome) {
      where.nome = ILike(`%${query.nome}%`);
    }

    if (query.email) {
      where.email = ILike(`%${query.email}%`);
    }

    const [clientes, total] = await this.clientesRepository.findAndCount({
      where,
      take: query.pageSize,
      skip,
    });

    return { content: clientes, total };
  }

  async findById(idCliente: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ idCliente });
    if (!cliente) throw new NotFoundException(`Usuário com ID '${idCliente}' não encontrado`);
    return cliente
  }

  async findByEmail(email: string): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ email });
    if (!cliente) throw new NotFoundException(`Usuário com email'${email}' não encontrado`);
    return cliente;
  }

  async create(data: ClienteDTO): Promise<Cliente> {
    const cliente = this.clientesRepository.create(data);
    return await this.clientesRepository.save(cliente);
  }

  async update(idCliente: number, cliente: ClienteDTO): Promise<Cliente> {
    const existingCliente = await this.findById(idCliente)

    Object.assign(existingCliente, cliente);

    return this.clientesRepository.save(existingCliente);
  }

  async delete(idCliente: number): Promise<void> {
    const cliente = await this.findById(idCliente);

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    await this.clientesRepository.remove(cliente);
  }
}
