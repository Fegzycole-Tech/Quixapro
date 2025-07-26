import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserFactory } from './domain/factories/user.factory';
import { UserService } from './domain/services/user.service';

@Module({
  imports: [CqrsModule],
  providers: [UserFactory, UserService],
  exports: [UserFactory, UserService],
})
export class UserModule {}
