import { Controller,  Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginAuthDto, RegisterAuthDto } from '../entities';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
   
   } 


  @Post('login')
  async loginUser(@Body() loginAuthDto: LoginAuthDto){
    return this.authService.login(loginAuthDto)

  }

 
}
