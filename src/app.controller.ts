import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersResolver } from './users/users.resolver'
import { User } from '../generated/prisma-client'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersResolver: UsersResolver
  ) {}

  @Get('users/')
  async getUsers(): Promise<User[]> {
    return await this.usersResolver.getUsers({})
  }
}
