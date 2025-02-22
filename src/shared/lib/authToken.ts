import jwt from "jsonwebtoken";

interface RegistrationPayload {
  userId: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function generateRegistrationToken(userId: string): string {
  return jwt.sign({ userId } as RegistrationPayload, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function verifyRegistrationToken(token: string): RegistrationPayload {
  return jwt.verify(token, JWT_SECRET) as RegistrationPayload;
}
