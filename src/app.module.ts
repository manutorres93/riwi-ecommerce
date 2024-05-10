import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from './libs/persistence';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './libs/auth/auth.module';
import { AuthService } from './libs/auth/service/auth.service';
import dbConfig from './libs/persistence/db-config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [dbConfig],
    isGlobal: true,
  }),
  AuthModule,
  PersistenceModule,
  UserModule
],
  providers: [ AuthService],
})
export class AppModule {}
