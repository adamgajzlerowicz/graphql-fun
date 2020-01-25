import { Module } from '@nestjs/common'

import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { PrismaModule } from './prisma/prisma.module'
import { GraphqlOptions } from './graphql.options'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    UsersModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
