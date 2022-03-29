import { getLoginSession, setLoginSession } from "../../lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { me } from "../../lib/user";

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getLoginSession(req);
    const user = session ?? null;
    // const user = session && (await me(parseInt(session.id))).me;

    // if (user) {
    //   console.log(
    //     "Session updated " +
    //       (Date.now() - user.session_createdAt) / 1000 +
    //       " sec ago"
    //   );
    // }

    if (user && Date.now() - user.session_createdAt > 60 * 60 * 1000) {
      console.log("Last session updated more than 1 hour ago, reset it!");
      await setLoginSession(res, session);
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).end("Authentication token is invalid, please log in");
  }
}
