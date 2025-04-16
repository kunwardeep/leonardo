import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/consts";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = { username: string; jobTitle: string; expiresAt: Date };
const HS256_ALGO = "HS256";
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: HS256_ALGO })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [HS256_ALGO],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify");
    return undefined;
  }
}

export async function createSession(username: string, jobTitle: string) {
  // 7 Day expiry
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, jobTitle, expiresAt });

  (await cookies()).set(COOKIE_NAME.SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_NAME.SESSION);
}

export async function getSession(): Promise<{
  username: string;
  jobTitle: string;
}> {
  const cookie = (await cookies()).get(COOKIE_NAME.SESSION)?.value;

  const session = await decrypt(cookie);

  return {
    username: session?.username as string,
    jobTitle: session?.jobTitle as string,
  };
}
