import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PassportModule } from '@nestjs/passport'
import { GraphqlOptions } from './graphql.options'
import { PostsModule } from './posts/posts.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),

    PrismaModule,
    PostsModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController]
})
export class AppModule {}
