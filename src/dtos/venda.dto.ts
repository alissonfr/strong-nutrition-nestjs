import { IsNotEmpty, IsOptional } from 'class-validator';
import { Cliente } from 'src/models/cliente.model';
import { User } from 'src/models/user.model';
import { VendaProduto } from 'src/models/venda-produto.model';

export class VendaDTO {
  @IsNotEmpty()
  dataVenda: Date;

  @IsOptional()
  observacao: string;

  @IsNotEmpty()
  cliente: Cliente;

  @IsNotEmpty()
  funcionario: User;

  @IsOptional()
  vendaProdutos: VendaProduto[];
}
