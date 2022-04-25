// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/db'
import pg from 'pg';


type SdkConfig = {
  id: number
  name: string
  version: string
  contents: {}
  metadata: {}
}

type Data = SdkConfig[] | string

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await db.query("SELECT * FROM sdk_config", [], (qErr, qRes) => {
      if (qRes === undefined || qErr) throw ("error");
      res.status(200).json(qRes.rows);
    })
  }
  catch {
    res.send("in catch, error");
    res.status(500).end();
    return
  }
}
