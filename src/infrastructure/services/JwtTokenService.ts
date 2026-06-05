import jwt from "jsonwebtoken";

export class JwtTokenService {

  generate(userId: string) {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );
  }
}