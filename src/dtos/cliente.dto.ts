import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Cliente } from 'src/models/cliente.model';
import { User } from 'src/models/user.model';

export class ClienteDTO {

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @IsOptional()
  cep: string;

  @IsOptional()
  uf: string;

  @IsOptional()
  cidade: string;

  @IsOptional()
  bairro: string;

  @IsOptional()
  rua: string;

  @IsOptional()
  residencia: string;

  @IsOptional()
  complemento: string;
}
