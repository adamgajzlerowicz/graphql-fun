import { Query, Resolver, Args, Info, Mutation } from '@nestjs/graphql'
import { HttpException, HttpStatus } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../prisma'

@Resolver()
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query('users')
  async getUsers(@Args() args, @Info() info = null): Promise<User[]> {
    return this.prisma.query.users(args, info)
  }

  @Mutation()
  async createSuperUser(@Args() args): Promise<User> {
    return await this.prisma.mutation.createUser(args)
  }

  @Mutation()
  async deleteUser() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
  }
}
