import { Query, Resolver, Args, Info, Mutation } from '@nestjs/graphql'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../../generated/prisma-client'

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
}
