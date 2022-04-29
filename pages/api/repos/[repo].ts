import { getToken } from "next-auth/jwt"
import { Octokit } from "octokit";

type Repo = {
  id: number
  full_name: string
  last_commit: 
  requested_fw: number
  group_id: number
  name: string
  mac: string
  uuid: string
  metadata: {}
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Device>
) {
  const { id, name } = req.query;
  try {
    const data = await db.query("SELECT * FROM device WHERE device_type=$1 AND id=$2 ", [name, id])
    res.status(200).json(data.rows[0]);
  }
  catch (err: any) {
    console.error(err.stack);
    res.send(err.stack);
    res.status(500).end();
    return
  }
}


