import * as crypto from 'crypto';

const secret = process.env.JWT_SECRET ?? crypto.randomBytes(32).toString('base64');

export default function getJwtSecret() {
  return secret;
}
