import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { RegisterAuthDto } from '../entities/register-auth.dto';
import {hash, compare} from 'bcrypt';
import { LoginAuthDto } from '../entities/login-auth.dyo';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService
) {}
 async register(userRegister:RegisterAuthDto){
    const {password, email}=userRegister

    const userExist= await this.userService.findOneByEmailToRegister(email)
      
    if(userExist){
        throw new NotFoundException(`User with email ${email} already exists`);
    } 

    const userCreated = await this.userService.create(userRegister)

    return { name: userCreated.name, email: userCreated.email}
  }

  async login(userLogin:LoginAuthDto){
    const {email, password}=userLogin

    const findUser = await this.userService.findOneByEmail(email)

    if (!findUser) throw new HttpException('User not found', 404)

    
    const isPasswordValid = await compare(password, findUser.password) //me retorna un true o un false
 
    
    if (!isPasswordValid) throw new HttpException('Incorrect password/contraseña incorrecta', 403)
    
    const secretKey = process.env.JWT_SECRET;

    const accessTokenOptions = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
      };
   
    const payload= {id: findUser._id, email: findUser.email, role:findUser.role} //Carga util
    const token = await this.jwtService.signAsync(payload, {
        secret: secretKey,
        expiresIn: accessTokenOptions.expiresIn,
    
    }) //firma del JWT
    
    const data= {
        email:findUser.email,
        role: findUser.role,
        token: token,
    };



    return data;

  }

  

}
