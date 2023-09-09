import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { users } from './entities/users.entity';
import { api } from './entities/api.entity';
import { log_api } from './entities/log_api.entity';
import { apixuser } from './entities/apixuser.entity';
import { jwtConstants } from './jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([users, api, log_api, apixuser]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
