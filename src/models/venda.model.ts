import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { VendaStatus } from '../enums/venda-status.enum';
import { VendaProduto } from './venda-produto.model';
import { Cliente } from './cliente.model';
import { User } from './user.model';

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

    @ManyToOne(() => Cliente, { eager: true, cascade: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    funcionario: User;

    @OneToMany(() => VendaProduto, (vendaProduto) => vendaProduto.venda, { eager: true, cascade: true })
    vendaProdutos: VendaProduto[];

}