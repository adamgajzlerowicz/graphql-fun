import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { GraphqlOptions } from './graphql.options'
import { PostsModule } from './posts/posts.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    PrismaModule,
    PostsModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {}
