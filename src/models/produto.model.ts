import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Fornecedor } from './fornecedor.model';

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
}