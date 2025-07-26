import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserFactory } from './domain/factories/user.factory';
import { UserRepository } from './domain/repositories/user.repository';
import { UserService } from './domain/services/user.service';

@Module({
  imports: [CqrsModule],
  providers: [UserFactory, UserService, UserRepository],
  exports: [UserFactory, UserService, UserRepository],
})
export class UserModule {}
