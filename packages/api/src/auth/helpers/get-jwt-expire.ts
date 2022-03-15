export default function getJwtExpire() {
  if (process.env.JWT_EXPIRE) {
    return process.env.JWT_EXPIRE;
  }

  return "6h";
}
