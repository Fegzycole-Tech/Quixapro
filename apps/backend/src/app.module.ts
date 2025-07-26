import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/services/database.service';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
