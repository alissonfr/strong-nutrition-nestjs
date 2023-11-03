import { IsNotEmpty, IsOptional } from 'class-validator';

export class FornecedorDTO {
  @IsNotEmpty()
  razaoSocial: string;

  @IsNotEmpty()
  nomeFantasia: string;

  @IsNotEmpty()
  cnpj: string;

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
  numero: string;

  @IsOptional()
  rua: string;

  @IsOptional()
  complemento: string;
}
