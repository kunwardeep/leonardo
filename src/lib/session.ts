import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies as headerCookies } from "next/headers";
import { COOKIE_NAME } from "@/consts";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = { username: string; jobTitle: string; expiresAt: Date };
const ALGO_HS256 = "HS256";

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGO_HS256 })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(cookie: string | undefined) {
  if (!cookie) {
    return undefined;
  }

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: [ALGO_HS256],
    });
    return payload;
  } catch (error) {
    console.log("Error happened while decrypting", error);
    return undefined;
  }
}

export async function createSession(username: string, jobTitle: string) {
  // 7 Day expiry
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ username, jobTitle, expiresAt });
  const cookies = await headerCookies();

  cookies.set(COOKIE_NAME.SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });

  return true;
}

export async function deleteSession() {
  const cookies = await headerCookies();
  cookies.delete(COOKIE_NAME.SESSION);
}

export async function getSession(): Promise<
  | {
      username: string;
      jobTitle: string;
    }
  | undefined
> {
  const cookies = await headerCookies();

  const cookie = cookies.get(COOKIE_NAME.SESSION)?.value;

  const session = await decrypt(cookie);
  if (!session) {
    return undefined;
  }

  return {
    username: session?.username as string,
    jobTitle: session?.jobTitle as string,
  };
}
