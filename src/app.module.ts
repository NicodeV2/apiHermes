import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './dotenv';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { users } from './auth/entities/users.entity';
import { api } from './auth/entities/api.entity';
import { apixuser } from './auth/entities/apixuser.entity';
import { log_api } from './auth/entities/log_api.entity';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: env.dbHost1,
      port: env.dbPort1,
      database: env.dbApis,
      username: env.dbUser1,
      password: env.dbPass1,
      synchronize: false,
      entities: [users, api, apixuser, log_api],
    }),
    AuthModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
