// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/db'
import pg from 'pg';


type DeviceType = {
  name: string
  default_sdk_config?: number
  vendor_mcu_id: string
  metadata: {}
}

type Data = DeviceType[] | string
let count = 0;

let postQuery =
  "INSERT INTO device_type (name, default_sdk_config, vendor_mcu_id, repo) VALUES ($1, $2, $3, $4)";

let getQuery = `
  SELECT device_type.*, count(device.device_type) as number_of_devices 
  FROM device_type
  LEFT OUTER JOIN device 
  ON (device_type.name = device.device_type)
  GROUP BY
    device_type.name;`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    await db.query(postQuery, [data.name, data.default_sdk_config, data.vendor_mcu_id, data.repo], (qErr, qRes) => {
      if (qErr) throw qErr;
      res.status(201).send('OK');
    })
  }

  if (req.method === 'GET') {
    await db.query(getQuery, [], (qErr, qRes) => {
      if (qRes === undefined || qErr) throw ("error");
      res.status(200).json(qRes.rows);
    })
  }
}
