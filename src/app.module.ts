import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db-config';
import { PersistenceModule } from './libs/persistence';
import { UserModule } from './modules/user/user.module';

import { AuthModule } from './libs/auth/auth.module';
import { AuthService } from './libs/auth/service/auth.service';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    load: [dbConfig],
    isGlobal: true,
  }),
  PersistenceModule,
  UserModule,
  AuthModule

],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
