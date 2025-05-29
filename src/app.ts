import express, { Application, Request, Response } from 'express';
import authRouter from './app/modules/auth/auth.router';
import userRouter from './app/modules/user/user.router';
import scheduleRouter from './app/modules/schedules/schedule.router';
import { globalErrorHandler } from './app/errors/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
import { bookingRouter } from './app/modules/bookings/booking.router';

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
app.use('/api/schedules', scheduleRouter);
app.use('/api/bookings', bookingRouter);

app.use((req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Route not found',
  });
});
app.use(globalErrorHandler);

export default app;
