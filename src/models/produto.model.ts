import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fornecedor } from './fornecedor.model';
import { Venda } from './venda.model';

@Entity({ name: 'produtos' })
export class Produto {
    @PrimaryGeneratedColumn('increment', { name: 'id_produto' })
    idProduto: number;

    @Column('varchar')
    nome: string;

    @Column('varchar')
    descricao: string;

    @Column('varchar')
    marca: string;

    @Column("decimal", { precision: 10, scale: 2 })
    preco: number;

    @ManyToOne(() => Fornecedor, (fornecedor) => fornecedor.produtos)
    @JoinColumn({ name: "id_fornecedor" })
    fornecedor: Fornecedor;

    @ManyToMany(() => Venda, (venda) => venda.produtos)
    @JoinTable({
    name: 'venda_produto',
    joinColumn: { name: 'id_produto', referencedColumnName: 'idProduto' },
    inverseJoinColumn: { name: 'id_venda', referencedColumnName: 'idVenda' },
    })
    vendas: Venda[];
}