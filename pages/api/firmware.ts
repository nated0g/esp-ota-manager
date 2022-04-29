import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(301).redirect('https://github.com/nated0g/esp-prom/releases/download/v1.0.1/esp-prom-example.bin');
}
