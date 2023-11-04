import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'fornecedores' })
export class Fornecedor {
    @PrimaryGeneratedColumn('increment', { name: 'cod_fornecedor' })
    codFornecedor: number;

    @Column('varchar', { name: 'razao_social' })
    razaoSocial: string;

    @Column('varchar', { name: 'nome_fantasia' })
    nomeFantasia: string;

    @Column('varchar')
    cnpj: string;

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
    numero: string;

    @Column('varchar', { nullable: true })
    rua: string;

    @Column('varchar', { nullable: true })
    complemento: string;
}