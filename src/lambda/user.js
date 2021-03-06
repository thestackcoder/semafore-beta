import cookie from "cookie"
// import { publicKey } from "./publickey"
import jwt from "jsonwebtoken"

const publicKey = `-----BEGIN PUBLIC KEY-----
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
-----END PUBLIC KEY-----
`

export async function handler(event) {
  const cookies = event.headers.cookie && cookie.parse(event.headers.cookie)

  if (!cookies || !cookies.jwt) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        msg: "There is no jwt cookie, so the request is unauthorized",
      }),
    }
  }

  try {
    // verify throws an error if it can't verify the jwt.
    // By default it also checks the exp claim, which is
    // where our expiry information is.
    // If the token is successfully verified,
    // it returns the payload.
    const payload = jwt.verify(cookies.jwt, publicKey)
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: payload.userId, email: payload.email }),
    }
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}