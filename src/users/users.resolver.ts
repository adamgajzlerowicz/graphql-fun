import { Query, Resolver, Args, Info } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma-client';

@Resolver()
export class UsersResolver {
    constructor(private readonly prisma: PrismaService) {}

    @Query('users')
    async getUsers(@Args() args, @Info() info): Promise<User[]> {
        return this.prisma.query.users(args, info);
    }
}
