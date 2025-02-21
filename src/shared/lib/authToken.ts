import jwt from "jsonwebtoken";

interface RegistrationPayload {
  userId: string;
  // Podrías poner más campos, como "step" o "roles" etc.
}

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function generateRegistrationToken(userId: string): string {
  // Expires en 1h, por ejemplo
  return jwt.sign({ userId } as RegistrationPayload, JWT_SECRET, {
    expiresIn: "1h",
  });
}

export function verifyRegistrationToken(token: string): RegistrationPayload {
  return jwt.verify(token, JWT_SECRET) as RegistrationPayload;
}
