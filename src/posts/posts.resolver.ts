import {
  Args,
  Info,
  Mutation,
  Query,
  Resolver,
  Subscription
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { Post } from '../../database/generated'
import { BatchPayload } from '../prisma/prisma.binding'
import { PrismaService } from '../prisma/prisma.service'
import { GqlAuthGuard } from '../auth/graphqlGuard'

@Resolver()
export class PostsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query('posts')
  async getPosts(@Args() args, @Info() info): Promise<Post[]> {
    return this.prisma.query.posts(args, info)
  }

  @Query('post')
  async getPost(@Args() args, @Info() info): Promise<Post> {
    return this.prisma.query.post(args, info)
  }

  @Mutation('createPost')
  async createPost(@Args() args, @Info() info): Promise<Post> {
    return this.prisma.mutation.createPost(args, info)
  }

  @Mutation('updatePost')
  async updatePost(@Args() args, @Info() info): Promise<Post> {
    return this.prisma.mutation.updatePost(args, info)
  }

  @Mutation('updateManyPosts')
  async updateManyPosts(@Args() args, @Info() info): Promise<BatchPayload> {
    return this.prisma.mutation.updateManyPosts(args, info)
  }

  @Mutation('deletePost')
  async deletePost(@Args() args, @Info() info): Promise<Post> {
    return this.prisma.mutation.deletePost(args, info)
  }

  @Mutation('deleteManyPosts')
  async deleteManyPosts(@Args() args, @Info() info): Promise<BatchPayload> {
    return this.prisma.mutation.deleteManyPosts(args, info)
  }

  @Subscription('post')
  onPostMutation(@Args() args, @Info() info) {
    return this.prisma.subscription.post(args, info)
  }

  @Mutation('createSuperPost')
  async createSuperPost(@Args() args, @Info() info): Promise<Post> {
    return this.prisma.mutation.createPost(args, info)
  }
}
