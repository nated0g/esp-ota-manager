// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/db'
import pg from 'pg';


type Device = {
  id: number
  reported_fw: number
  requested_fw: number
  group_id: number
  name: string
  mac: string
  uuid: string
  metadata: {}
}

type Data = Device[] | string
let count = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    await db.query("SELECT * FROM device", [], (qErr, qRes) => {
      if (qRes === undefined || qErr) throw ("error");
      console.log(count++);
      res.status(200).json(qRes.rows);
    })
  }
  catch {
    res.send("in catch, error");
    res.status(500).end();
    return
  }
}

