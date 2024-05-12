import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { User, UserSchema } from '../../modules/user/entities/user.entity';
import { AuthService } from './service/auth.service';
import { UserModule } from '../../modules/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, 
        schema: UserSchema }]),
    JwtModule.register({
          global: true,
          secret:process.env.JWT_SECRET, 
          signOptions: { expiresIn: '1d' },
        }),
        UserModule
  ],
  controllers: [AuthController],

providers: [ AuthService, JwtService, JwtStrategy]
})
export class AuthModule {

}
