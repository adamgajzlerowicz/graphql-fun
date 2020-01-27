import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { compare, hash } from 'bcrypt'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  // @Get('')
  // async foo(@Request() req) {
  //   const hashed = await hash('mypassword', 10)
  //
  //   const result = await compare('mypassword', hashed)
  //
  //   console.log(result)
  // }
}
