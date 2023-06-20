import { Router, Request, Response } from 'express';
import leadRepository from '../repositories/lead.repository';
import { verify_token } from '../utils/const';


const router = Router();

// Create a new lead
router.post('/', async (req: Request, res: Response) => {

    try {
        const leadData = req.body;
        console.log("WEBHOOK_received", JSON.stringify(leadData, null, 2));
        const newLead = await leadRepository.createLead(leadData);
        console.log("WEBHOOK_update", JSON.stringify(newLead, null, 2));
        res.json(newLead);
    } catch (error) {
        console.log("WEBHOOK_error", JSON.stringify(error, null, 2));
        res.status(500).json({ error: 'Failed to create lead' });
    }
});

// Get all leads
router.get('/', async (req: Request, res: Response) => {
    try {

        // Parse params from the webhook verification request
        let mode = req.query["hub.mode"];
        let token = req.query["hub.verify_token"];
        let challenge = req.query["hub.challenge"];

        // Check if a token and mode were sent
        if (mode && token) {
            // Check the mode and token sent are correct
            if (mode === "subscribe" && token === verify_token) {
                // Respond with 200 OK and challenge token from the request
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403).json({ error: 'Failed to subscribe webhook' });;
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to register webhook' });
    }
});

export default router;
