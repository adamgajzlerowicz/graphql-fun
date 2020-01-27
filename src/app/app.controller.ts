import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { compare, hash } from 'bcrypt'

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user
  }

  @Get('')
  async foo(@Request() req) {
    const hashed = await hash('mypassword', 10)

    const result = await compare('mypassword', hashed)

    console.log(result)
  }
}
