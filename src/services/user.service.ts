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

  async findById(idUser: number) {
    const user = await this.usersRepository.findOneBy({ idUser });
    if (!user) throw new NotFoundException(`Usuário com ID '${idUser}' não encontrado`);
    return user
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) throw new NotFoundException(`Usuário com email'${email}' não encontrado`);
    return user;
  }

  async create(data: UserDTO) {
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(idUser: number, user: User): Promise<User> {
    const existingUser = await this.findById(idUser)

    Object.assign(existingUser, user);

    return this.usersRepository.save(existingUser);
  }
}
