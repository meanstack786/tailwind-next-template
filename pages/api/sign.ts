// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MeInterface } from 'types/user'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeInterface>
) {
  console.log(req.method)
  setTimeout(() => {
    res.status(200).json({ id: '1000','email':'admin@admin.com','name':'admin','roles':['admin'] })
  }, 1000)
}
