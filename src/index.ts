import express, { Request, Response, NextFunction } from 'express'
import booksRouter from './routes/libro'
import healthRouter from './routes/health'

const app = express()
app.use(express.json())

app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'El cuerpo de la petición debe ser un JSON válido.' })
  }
  next()
})

const PORT = 3000

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/books', booksRouter)
app.use('/health', healthRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})