import { IsDateString, IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';
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
  @Matches(RegExHelper.password, { message: "A senha deve conter letras maiúsculas, minúsculas números e caracteres especiais" })
  senha: string;

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
  residencia: number;

  @IsOptional()
  complemento: string;
}
