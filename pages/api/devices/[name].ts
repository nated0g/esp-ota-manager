// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/db'
import pg from 'pg';


type DeviceType = {
  name: string
  default_sdk_config?: number
  vendor_mcu_id: string
  metadata: {}
}

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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeviceType>
) {
  const { name } = req.query;
  try {
    const device_type = await db.query("SELECT * FROM device_type WHERE name=$1", [name])
    const devices = await db.query("SELECT * FROM device WHERE device_type=$1", [name])
    let data = {
      device_type: device_type?.rows[0],
      devices: devices.rows
    }
    res.status(200).json(data);
  }
  catch (err: any) {
    console.error(err.stack);
    res.send(err.stack);
    res.status(500).end();
    return
  }
}


