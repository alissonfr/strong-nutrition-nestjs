import { Module } from '@nestjs/common';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { User } from './models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserModule } from './app/user/user.module';

const imports = [
  ConfigModule.forRoot(),
  DatabaseConfig,
  TypeOrmModule.forFeature([
    User
  ])
]

const controllers = [
  UserController
]

const services = [
  UserService
]

@Module({
  imports: [...imports, UserModule],
  controllers: [...controllers],
  providers: [...services]
})
export class AppModule { }
