// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get('https://24pullrequests.com/users.json')
    res.status(200).json(response.data)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}
