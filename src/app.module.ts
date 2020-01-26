import { Module } from '@nestjs/common'

import { GraphQLModule } from '@nestjs/graphql'
import { PrismaModule } from './prisma/prisma.module'
import { GraphqlOptions } from './graphql.options'

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions
    }),
    PrismaModule
  ],
})
export class AppModule {}
