import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'

@Module({
  providers: [AuthService],
  imports: [UsersModule],
  exports: [AuthService]
})
export class AuthModule {}
