import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from './users/users.module';
import {UsersResolver} from './users/users.resolver';
import {PrismaService} from './prisma/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, UsersResolver, PrismaService ],
})
export class AppModule {}
