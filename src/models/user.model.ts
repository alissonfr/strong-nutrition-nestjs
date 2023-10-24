import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { hashSync } from 'bcrypt';

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

    @Column('varchar', { unique: true })
    email: string;

    @Column('varchar')
    senha: string;

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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.senha = hashSync(this.senha, 10);
    }
}