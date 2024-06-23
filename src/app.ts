import { Request, Response } from 'express';
import allRoutes from "./app/routes/index"
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use('/api/v1', allRoutes);
const test = (req: Request, res: Response) => {
  res.send('Hello NewBie!');
};
app.get('/', test);
app.use(globalErrorHandler);
app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});

export default app;
