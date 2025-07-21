import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database/services/database.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [DatabaseService],
})
export class AppModule {}
