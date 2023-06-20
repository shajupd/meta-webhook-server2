import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import leadController from './src/controllers/lead.controller';
import webhookController from './src/controllers/webhook.controller'

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://mongo_user:rec123@cluster0.ayrb0el.mongodb.net/meta-webhook-db';

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express app!');
});

app.use('/users', leadController);
app.use('/webhook', webhookController);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
