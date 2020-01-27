import {
  Args,
  Info,
  Mutation,
  Query,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { NotImplementedException } from '@nestjs/common'
import { hashSync } from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { User, UserCreateInput } from '../../database/generated'
import { BatchPayload } from '../prisma/prisma.binding'
import { SALT_ROUNDS } from '../constants/common'

@Resolver()
export class UsersResolver {
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
  async createUser(
    @Args() args: { data: UserCreateInput },
    @Info() info
  ): Promise<Omit<User, 'password'>> {
    const hashedPass = hashSync(args.data.password, SALT_ROUNDS)

    const result = await this.prisma.mutation.createUser(
      {
        data: {
          ...args.data,
          password: hashedPass
        }
      },
      info
    )

    const { password, ...user } = result

    return Promise.resolve(user)
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

  @Subscription('user')
  onUserMutation(@Args() args, @Info() info) {
    throw new NotImplementedException()
  }
}
