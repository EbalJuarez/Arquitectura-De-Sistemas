import express from 'express'
import { getFitnessReport } from './services/LibrosServices'

const router = express.Router()

router.get('/fitness', (_req, res) => {
  const { isHealthy, report } = getFitnessReport()

  if (isHealthy) {
    return res.status(200).json(report)
  } else {
    return res.status(503).json(report)
  }
})

export default router