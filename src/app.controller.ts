import { Controller, Get } from '@nestjs/common'
import { UsersResolver } from './users/users.resolver'
import { User } from './prisma'

@Controller()
export class AppController {
  constructor(private readonly usersResolver: UsersResolver) {}

  @Get('users/')
  async getUsers(): Promise<User[]> {
    return await this.usersResolver.getUsers({})
  }
}
