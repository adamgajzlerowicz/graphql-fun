import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { UsersService } from '../users/users.service'
import { User } from '../../database/generated'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(
    name: string,
    passwordString: string
  ): Promise<Partial<User> | null> {
    const user = await this.usersService.findOne(name)

    if (!user) {
      return
    }

    const match = await compare(passwordString, user.password)

    if (!match) {
      return null
    }
    const { password, ...result } = user

    return result
  }
}
