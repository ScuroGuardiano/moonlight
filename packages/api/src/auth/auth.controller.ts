import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import UserCreateDto from './dto/user-create.dto';
import UserDto from './dto/user-dto';
import UserLoginDto from './dto/user-login-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import User from './models/user.entity';
import { SessionService } from './services/session.service';
import { UsersService } from './services/users.service';
import SessionDto from './dto/session-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request: { user: User }, @Body() body: UserLoginDto) {
    const { access_token } = await this.authService.signWithBlood(request.user);
    await this.sessionService.createSession(access_token, request as any);
    return { access_token };
  }

  @Post('/register')
  async register(@Request() request, @Body() userData: UserCreateDto) {
    const user = await this.authService.register(userData);
    const { access_token } = await this.authService.signWithBlood(user);
    await this.sessionService.createSession(access_token, request);
    return { access_token };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout')
  async logout(@Request() req): Promise<void> {
    await this.sessionService.destroySessionByJwt(req.headers.authorization.split(' ')[1]);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserInfo(@Request() req): Promise<UserDto> {
    const user = await this.usersService.getById(req.user.id);
    return UserDto.fromEntity(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getSessions(@Request() req): Promise<SessionDto[]> {
    const sessions = await this.sessionService.getUserSessions(req.user.id);
    return sessions.map(SessionDto.fromEntity);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sessions')
  async destroyAllSessions(@Request() req) {
    const deleted = await this.sessionService.destroyAllUserSessions(req.user.id);
    return { deleted };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('session/:id')
  async destroySession(@Param() id: string) {
    const deleted = await this.sessionService.destroySessionByHash(id);
    if (!deleted) {
      throw new NotFoundException();
    }
  }
}
