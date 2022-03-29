import { removeTokenCookie } from "../../lib/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";


export default async function logout(
  _: NextApiRequest,
  res: NextApiResponse
) {
  try {
    removeTokenCookie(res);

    res.writeHead(302, { Location: "/" });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}