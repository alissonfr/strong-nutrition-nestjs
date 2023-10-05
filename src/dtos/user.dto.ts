import { IsDateString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { RegExHelper } from '../helpers/regex.helper';

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
  @Matches(RegExHelper.password, { message: 'A senha deve conter letras maiúsculas e minúsculas' })
  senha: string;

  cep: string;

  uf: string;

  cidade: string;

  bairro: string;

  rua: string;

  residencia: number;

  complemento: string;
}
