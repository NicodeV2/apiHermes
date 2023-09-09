import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { loginAuthDto } from './dto/loginAuth.dto';
import { registerAuthDto } from './dto/registerAuth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  loginUser(@Body() loginObject: loginAuthDto) {
    return this.authService.loginAuth(loginObject);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  registerUser(@Body() registerObject: registerAuthDto) {
    return this.authService.registerAuth(registerObject);
  }
}
