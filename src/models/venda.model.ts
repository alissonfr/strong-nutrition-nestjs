import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VendaStatus } from '../enums/venda-status.enum';
import { Produto } from './produto.model';

@Entity({ name: 'vendas' })
export class Venda {
    @PrimaryGeneratedColumn('increment', { name: 'id_venda' })
    idVenda: number;

    @Column('date', { name: 'data_venda' })
    dataVenda: Date;

    @Column({
        type: 'enum',
        enum: VendaStatus,
        default: VendaStatus.Pendente,
        nullable: false,
        name: 'venda_status'
    })
    status: VendaStatus;

    @Column('varchar', { nullable: true })
    complemento: string;

    @ManyToMany(() => Produto, (produto) => produto.vendas)
    @JoinTable({
        name: 'venda_produto',
        joinColumn: { name: 'id_venda', referencedColumnName: 'idVenda' },
        inverseJoinColumn: { name: 'id_produto', referencedColumnName: 'idProduto' }
    })
    produtos: Produto[];
}