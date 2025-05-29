import express from 'express';
import { bookingController } from './booking.controller';
import validateRequest from '../../../middlewares/validateRequest';
import { createBookingZodSchema } from './bookingValidation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createBookingZodSchema),
  bookingController.createBooking,
);
router.patch('/cancel/:bookingId', bookingController.cancelBooking);

export const bookingRouter = router;
