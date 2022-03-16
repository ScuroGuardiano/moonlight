import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private sessionService: SessionService) {
        super();
    }

    async canActivate(context: any) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException();
        }
        const token = authHeader.split(' ')[1];
        const isValid = await this.sessionService.doesSessionExistsByJwt(token);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        const result = super.canActivate(context);
        if (result instanceof Observable) {
            return firstValueFrom(result);
        }
        return result;
    }
}
