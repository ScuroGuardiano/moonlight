import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { createHash } from "crypto";
import { Request } from "express";
import { Repository } from "typeorm";
import Session from "../models/session.entity";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    private jwtService: JwtService
  ) {}

  async doesSessionExistsByJwt(jwt: string) {
    const session = this.sessionRepository.findOne({ hashedJwt: this.hashJWT(jwt) });
    return !!session;
  }

  async createSession(jwt: string, request: Request) {
    const jwtData = this.jwtService.decode(jwt) as any;
    const session = new Session();
    session.userId = jwtData.sub;
    session.hashedJwt = this.hashJWT(jwt);
    session.expiration = new Date(jwtData.exp);
    session.userAgent = request.headers['user-agent'] ?? "uknown";
    // Assuming that 'trust proxy' is set.
    session.ip = request.ip;
    await this.sessionRepository.save(session);
  }

  async destroySessionByJwt(jwt: string) {
    return this.destroySessionByHash(this.hashJWT(jwt));
  }

  async destroySessionByHash(hashedJwt: string) {
    const { affected } = await this.sessionRepository.delete({
      hashedJwt
    });
    
    return typeof affected === 'number' && affected > 0;
  }

  async getUserSessions(userId: string) {
    return this.sessionRepository.find({ userId });
  }

  async destroyAllUserSessions(userId: string) {
    const { affected } = await this.sessionRepository.delete({
      userId
    });
    return affected;
  }

  private hashJWT(jwt: string): string {
    return createHash('sha256').update(jwt).digest('hex');
  }
}
