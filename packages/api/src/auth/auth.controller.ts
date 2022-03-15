import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import UserCreateDto from './dto/user-create.dto';
import UserDto from './dto/user-dto';
import UserLoginDto from './dto/user-login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import User from './models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request: { user: User }, @Body() body: UserLoginDto) {
    return this.authService.signWithBlood(request.user);
  }

  @Post('/register')
  async register(@Body() userData: UserCreateDto) {
    const user = await this.authService.register(userData);
    return this.authService.signWithBlood(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.headers.authorization.split(' ')[1]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Request() req) {
    return await this.authService.getUserById(req.user.id);
  }
}
