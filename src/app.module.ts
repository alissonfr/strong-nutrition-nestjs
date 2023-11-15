import { Module } from '@nestjs/common';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Fornecedor } from './models/fornecedor.model';
import { FornecedorController } from './controllers/fornecedor.controller';
import { FornecedorService } from './services/fornecedor.service';
import { Produto } from './models/produto.model';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';

const imports = [
  ConfigModule.forRoot(),
  DatabaseConfig,
  PassportModule,
  TypeOrmModule.forFeature([
    User,
    Fornecedor,
    Produto
  ]),
  JwtModule.register({
    privateKey: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })
]

const controllers = [
  UserController,
  AuthController,
  FornecedorController,
  ProdutoController
]

const services = [
  UserService,
  AuthService,
  FornecedorService,
  ProdutoService
]

@Module({
  imports: [...imports],
  controllers: [...controllers],
  providers: [...services, LocalStrategy, JwtStrategy]
})
export class AppModule { }
