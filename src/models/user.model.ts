import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('increment', { name: 'id_user' })
    idUser: number;

    @Column('varchar')
    nome: string;

    @Column('varchar')
    cpf: string;

    @Column('date', { name: 'data_nascimento' })
    dataNascimento: Date;

    @Column('varchar')
    telefone: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    senha: string;

    @Column('varchar')
    cep: string;

    @Column('varchar')
    uf: string;

    @Column('varchar')
    cidade: string;

    @Column('varchar')
    bairro: string;

    @Column('varchar')
    rua: string;

    @Column('integer')
    residencia: number;

    @Column('varchar', { nullable: true })
    complemento: string;
}