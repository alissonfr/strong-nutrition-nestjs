import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from 'src/models/user.model';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async findOneOrFail(
    options?: FindOneOptions<User>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async find(): Promise<User[]> {
    return await this.usersRepository.find();
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
