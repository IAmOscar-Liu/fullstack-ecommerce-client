import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import passport from "passport";
import { handleSession } from "../../lib/authenticate";

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(handleSession);