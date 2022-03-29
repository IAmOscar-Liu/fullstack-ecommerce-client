import { registerUser } from "../../lib/user";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    try {
      const { email, name, password } = req.body;
      await registerUser({ name, email, password });

      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(500).end(error.message);
    }
  }
);
