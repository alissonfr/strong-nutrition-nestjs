import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            autoLoadEntities: true,
            type: 'postgres',
            host: process.env.DB_HOST,
            port: new Number(process.env.DB_PORT).valueOf(),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
                entities: [
                    __dirname + '/../../models/*.model{.ts,.js}'
            ],
            synchronize: true,
            logging: true
        }),
    ],
    exports: [TypeOrmModule]
})
export class DatabaseConfig {}