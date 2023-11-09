import { IsNotEmpty, IsOptional } from 'class-validator';
import { Fornecedor } from 'src/models/fornecedor.model';

export class ProdutoDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNotEmpty()
  marca: string;

  @IsNotEmpty()
  preco: number;

  @IsNotEmpty()
  fornecedor: Fornecedor;
}
