import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, ILike, Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { UserDTO } from '../dtos/user.dto';
import { PaginatorInterface } from 'src/interfaces/paginator.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async find(query): Promise<PaginatorInterface<User>> {
    const skip = (query.page - 1) * query.pageSize;

    const where: {
      nome?: string | FindOperator<string>;
      email?: string | FindOperator<string>;
    } = {};

    if (query.nome) {
      where.nome = ILike(`%${query.nome}%`);
    }

    if (query.email) {
      where.email = ILike(`%${query.email}%`);
    }

    const [users, total] = await this.usersRepository.findAndCount({
      where,
      take: query.pageSize,
      skip,
    });

    return { content: users, total };
  }

  async findAllNoPaginate(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findById(idUser: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ idUser });
    if (!user) throw new NotFoundException(`Usuário com ID '${idUser}' não encontrado`);
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(`Usuário com email'${email}' não encontrado`);
    return user;
  }

  async create(data: UserDTO): Promise<User> {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(idUser: number, user: UserDTO): Promise<User> {
    const existingUser = await this.findById(idUser)

    Object.assign(existingUser, user);

    return this.usersRepository.save(existingUser);
  }

  async delete(idUser: number): Promise<void> {
    const user = await this.findById(idUser);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.usersRepository.remove(user);
  }
}
