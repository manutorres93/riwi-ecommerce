import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { UserModule } from 'src/modules/user/user.module';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, 
        schema: UserSchema }]),
    JwtModule.register({
          global: true,
          secret:process.env.JWT_SECRET, //process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
        UserModule
  ],
  controllers: [AuthController],

providers: [ AuthService, JwtService]
})
export class AuthModule {

}
