import { IsNotEmpty, IsOptional } from 'class-validator';
import { VendaProduto } from 'src/models/venda-produto.model';

export class VendaDTO {

  @IsNotEmpty()
  dataVenda: Date;

  @IsOptional()
  observacao: string;

  @IsOptional()
  vendaProdutos: VendaProduto[];
}
