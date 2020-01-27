import { Injectable, NotImplementedException } from '@nestjs/common'
import { Args, Info, Mutation, Query, Subscription } from '@nestjs/graphql'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '../../../database/generated'
import { BatchPayload } from '../prisma/prisma.binding'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  @Query('users')
  async getUsers(@Args() args, @Info() info): Promise<User[]> {
    throw new NotImplementedException()
  }

  @Query('user')
  async getUser(@Args() args, @Info() info): Promise<User> {
    throw new NotImplementedException()
  }

  @Mutation('createUser')
  async createUser(@Args() args, @Info() info): Promise<User> {
    return this.prisma.mutation.createUser(args, info)
  }

  @Mutation('updateUser')
  async updateUser(@Args() args, @Info() info): Promise<User> {
    throw new NotImplementedException()
  }

  @Mutation('updateManyUsers')
  async updateManyUsers(@Args() args, @Info() info): Promise<BatchPayload> {
    throw new NotImplementedException()
  }

  @Mutation('deleteUser')
  async deleteUser(@Args() args, @Info() info): Promise<User> {
    throw new NotImplementedException()
  }

  @Mutation('deleteManyUsers')
  async deleteManyUsers(@Args() args, @Info() info): Promise<BatchPayload> {
    throw new NotImplementedException()
  }

  @Subscription('users')
  onUserMutation(@Args() args, @Info() info) {
    throw new NotImplementedException()
  }

  async findOne(name: string): Promise<Partial<User> | undefined> {
    const result = await this.prisma.query.users({ where: { name } })

    if (result.length) {
      return result[0]
    }
  }
}
