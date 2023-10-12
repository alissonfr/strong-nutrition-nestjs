import { IsDateString, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

import { RegExHelper } from '../helpers/regex.helper';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class UserDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  dataNascimento: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  senha: string;

  @IsOptional() // Indica que as propriedades abaixo são opcionais
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
  residencia: number;

  @IsOptional()
  complemento: string;
}
