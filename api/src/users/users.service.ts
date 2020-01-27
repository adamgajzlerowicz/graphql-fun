import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../../../database/generated'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(name: string): Promise<Partial<User> | undefined> {
    const result = await this.prisma.query.users({ where: { name } })

    if (result.length) {
      return result[0]
    }
  }
}
