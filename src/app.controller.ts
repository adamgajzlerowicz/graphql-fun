import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { UsersResolver } from './users/users.resolver'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersResolver: UsersResolver
  ) {}

  @Get('users/')
  async whatever(): Promise<string> {
    const result = await this.usersResolver.getUsers({});

    return JSON.stringify(result)
  }
}
