import { Injectable } from '@nestjs/common'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../../database/generated'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

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

  async login(user: User) {
    const payload = { username: user.name, sub: user.id }

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
