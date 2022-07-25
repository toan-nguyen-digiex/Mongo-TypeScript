import express, { Request, Response } from 'express'
import { Menu } from '../models/menu'

const router = express.Router()

router.get('/api/menu', async (req: Request, res: Response) => {
  const menu = await Menu.find({title: "123"})
  return res.status(200).send(menu)
})

router.post('/api/menu', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const menu = Menu.build({ title, description })
  await menu.save()
  return res.status(201).send(menu)
})

export { router as menuRouter }