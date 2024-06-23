import { Request, Response } from 'express';
import allRoutes from './app/routes/index';
import cors from "cors"
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1', allRoutes);
const test = (req: Request, res: Response) => {
  res.send('Hello NewBie!');
};
app.get('/', test);
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});
app.use(globalErrorHandler);

export default app;
