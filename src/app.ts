import express, { Application, Request, Response } from 'express';
import authRouter from './app/modules/auth/auth.router';
import userRouter from './app/modules/user/user.router';

const app: Application = express();

app.use(express.json());

// application routes
const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', getAController);

// routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

export default app;
