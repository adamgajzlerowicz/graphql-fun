import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from '../../../database/generated'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(
    name: string,
    password: string
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne(name)

    if (user && user.password === password) {
      const { password, ...result } = user

      return result
    }
    return null
  }
}
