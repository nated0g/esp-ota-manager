import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const options = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "read:user, user:email, repo" } }
      // authorizationUrl: "https://github.com/login/oauth/authorize?scope=read:user+user:email+repo",
    })],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token
    }
  },
  debug: false
}

export default (req: NextApiRequest, res: NextApiResponse) => (
  NextAuth(req, res, options)
)