import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'
import { Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    return {
      typePaths: ['./src/**/*.graphql'],
      path: '/graphql',
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false
      },
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.d.ts'),
        outputAs: 'class'
      }
    }
  }
}
