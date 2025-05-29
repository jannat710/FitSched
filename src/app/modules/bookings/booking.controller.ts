import { Request, Response } from 'express';
import { bookingService } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { scheduleId, traineeId } = req.body;

  const result = await bookingService.createBooking({
    schedule: scheduleId,
    trainee: traineeId,
  });

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.CREATED,
    message: 'Class booked successfully',
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  await bookingService.cancelBooking(bookingId);

  sendResponse(res, {
    status: true,
    statusCode: StatusCodes.OK,
    message: 'Booking cancelled successfully',
    data: null,
  });
});

export const bookingController = {
  createBooking,
  cancelBooking,
};
