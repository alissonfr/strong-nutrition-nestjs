import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Produto } from './produto.model';
import { Venda } from './venda.model';

@Entity()
export class VendaProduto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantidade: number;

    @ManyToOne(() => Venda, (venda) => venda.vendaProdutos)
    @JoinColumn({ name: "id_venda" })
    venda: Venda;

    @ManyToOne(() => Produto, (produto) => produto.vendaProdutos)
    @JoinColumn({ name: "id_produto" })
    produto: Produto;
}
