import { z } from 'zod';

export const createBookingZodSchema = z.object({
  body: z.object({
    scheduleId: z.string({
      required_error: 'Schedule ID is required',
    }),
    traineeId: z.string({
      required_error: 'Trainee ID is required',
    }),
  }),
});
