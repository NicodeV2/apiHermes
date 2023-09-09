import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { api } from './entities/api.entity';
import { apixuser } from './entities/apixuser.entity';
import { log_api } from './entities/log_api.entity';
import { users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { registerAuthDto } from './dto/registerAuth.dto';
import { apiConstants } from 'src/api.constats';
import { loginAuthDto } from './dto/loginAuth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(users) private usersRepository: Repository<users>,
    @InjectRepository(api) private apiRepository: Repository<api>,
    @InjectRepository(log_api) private logapiRepository: Repository<log_api>,
    @InjectRepository(apixuser)
    private apixuserRepository: Repository<apixuser>,
    private jwtService: JwtService,
  ) {}

  async registerAuth(authObject: registerAuthDto) {
    console.log(`entro a registerAuth`);

    const { pass } = authObject;
    const plainToHash = await hash(pass, 10);
    authObject = { ...authObject, pass: plainToHash };
    // console.log(authObject);
    const newAuth = this.usersRepository.create(authObject);
    //console.log(`entro a registerAuth`);
    const newUser = await this.usersRepository.save(newAuth);
    const apiData = await this.apiRepository.findOne({
      where: {
        name: apiConstants.name,
        status: 0,
      },
    });
    // console.log(`entro a registerAuth 2`);
    if (!apiData) {
      throw new HttpException('Check api access', 404);
    }
    const newApixUser = new apixuser();
    newApixUser.id_api = apiData.id;
    newApixUser.id_user = newUser.id_users;
    newApixUser.status = 0;
    const apixuserData = await this.apixuserRepository.save(newApixUser);

    //console.log(apixuserData.id_apixuser);
    const newLogApi = new log_api();
    newLogApi.id_apixuser = apixuserData.id_apixuser;
    newLogApi.desc = 'Registro de nuevo usuario para api ' + apiData.name;
    await this.logapiRepository.save(newLogApi);

    return newUser;
  }

  async loginAuth(loginAuth: loginAuthDto) {
    const { user, pass } = loginAuth;
    const findAuth = await this.usersRepository.findOne({
      where: {
        user,
        status: 0,
      },
    });
    if (!findAuth) {
      throw new HttpException('User not found', 404);
    }
    const checkPassword = await compare(pass, findAuth.pass);
    if (!checkPassword) {
      throw new HttpException('Invalid credentials', 401);
    }
    const apiData = await this.apiRepository.findOne({
      where: {
        name: apiConstants.name,
        status: 0,
      },
    });
    if (!apiData) {
      throw new HttpException('Check api', 404);
    }
    console.log(`Id usuario:` + findAuth.id_users);
    console.log(`Id api:` + apiData.id);
    const checkApi = await this.apixuserRepository.findOne({
      where: {
        id_user: findAuth.id_users,
        id_api: apiData.id,
        status: 0,
      },
    });
    if (!checkApi) {
      throw new HttpException('Check api access', 404);
    }
    const payload = { id: findAuth.id_users, user: findAuth.user };
    const token = await this.jwtService.sign(payload);
    const data = {
      user: findAuth.user,
      token,
    };
    return data;
  }
}
