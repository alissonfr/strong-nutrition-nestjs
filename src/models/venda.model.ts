import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { VendaStatus } from '../enums/venda-status.enum';
import { VendaProduto } from './venda-produto.model';

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
    observacao: string;

    @OneToMany(() => VendaProduto, (vendaProduto) => vendaProduto.venda, { eager: true, cascade: true })
    vendaProdutos: VendaProduto[];

}