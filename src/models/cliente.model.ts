import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
    @PrimaryGeneratedColumn('increment', { name: 'id_cliente' })
    idCliente: number;

    @Column('varchar')
    nome: string;

    @Column('varchar')
    cpf: string;

    @Column('varchar', { unique: true })
    email: string;

    @Column('varchar')
    telefone: string;

    @Column('varchar', { nullable: true })
    cep: string;

    @Column('varchar', { nullable: true })
    uf: string;

    @Column('varchar', { nullable: true })
    cidade: string;

    @Column('varchar', { nullable: true })
    bairro: string;

    @Column('varchar', { nullable: true })
    rua: string;

    @Column('varchar', { nullable: true })
    residencia: string;

    @Column('varchar', { nullable: true })
    complemento: string;

}