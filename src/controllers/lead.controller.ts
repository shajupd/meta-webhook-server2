import { Router, Request, Response } from 'express';
import leadRepository from '../repositories/lead.repository';
import { verify_token } from '../utils/const';

const router = Router();

// Create a new lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const leadData = req.body;
    const newLead = await leadRepository.createLead(leadData);
    res.json(newLead);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lead' });
  }
});


export default router;
