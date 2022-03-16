import Session from "../models/session.entity";

export default class SessionDto {
  userAgent: string;
  ip: string;
  sessionId: string;
  createdAt: string;

  static fromEntity(session: Session): SessionDto {
    const dto = new SessionDto();
    dto.ip = session.ip;
    dto.userAgent = session.userAgent;
    dto.sessionId = session.hashedJwt;
    dto.createdAt = session.createdAt.toISOString();
    return dto;
  }
}
