import { Response } from 'express'
import { pool } from '../db'

export const ping = async (_req: any, res: Response) => {
  const [solution] = await pool.query('SELECT 1 + 1 AS solution')
  res.json(solution)
}
