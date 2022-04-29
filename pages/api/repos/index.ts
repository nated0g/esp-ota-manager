// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import { Octokit } from "octokit";

const secret = process.env.NEXTAUTH_SECRET;

interface JWT {
  accessToken: string
}

export default async (req, res) => {
  const token = await getToken({ req, secret })
  const octokit = new Octokit({ auth: token.accessToken });
  const data = await octokit.request('GET /user/repos', {})
  console.log(data)
  res.status(200).json(data)
}